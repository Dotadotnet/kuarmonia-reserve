const multer = require("multer");
const crypto = require("crypto");
const sharp = require("sharp");
const { S3Client, PutObjectCommand, CreateBucketCommand, HeadBucketCommand } = require("@aws-sdk/client-s3");

// MinIO client configuration
const s3Client = new S3Client({
  endpoint: process.env.MINIO_ENDPOINT,
  forcePathStyle: true,
  region: process.env.MINIO_REGION || "us-east-1",
  credentials: {
    accessKeyId: process.env.MINIO_ACCESS_KEY,
    secretAccessKey: process.env.MINIO_SECRET_KEY,
  },
});

// Helper function to generate date folder
const getDateFolder = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  return `${year}-${month}`;
};

const upload = (bucketName) => {
  const storage = multer.memoryStorage();

  const multerInstance = multer({
    storage,
    fileFilter: (_, file, cb) => {
      const imageFormats = /jpg|jpeg|png|webp/i; // فقط تصاویر قابل تبدیل هستند
      const videoFormats = /mp4|avi|mkv/i; // ویدیوها تغییری نمی‌کنند
      const extension = file.originalname.split(".").pop().toLowerCase();

      if (imageFormats.test(extension) || videoFormats.test(extension)) {
        cb(null, true);
      } else {
        cb(new Error("فرمت فایل باید تصویر (png/jpg/jpeg/webp) یا ویدئو (mp4/avi/mkv) باشد"));
      }
    },
  });

  const minioUploadMiddleware = (fieldConfig) => async (req, res, next) => {
    multerInstance.fields(fieldConfig)(req, res, async (err) => {
      if (err) {
        return res.status(400).json({
          acknowledgement: false,
          message: "Bad Request",
          description: err.message,
        });
      }

      const dateFolder = getDateFolder();
      try {
        // بررسی و ایجاد سطل در MinIO
        try {
          await s3Client.send(new HeadBucketCommand({ Bucket: bucketName }));
        } catch (e) {
          await s3Client.send(new CreateBucketCommand({ Bucket: bucketName }));
        }

        req.uploadedFiles = {};

        const fileFields = Object.keys(req.files || {});
        for (const field of fileFields) {
          req.uploadedFiles[field] = [];
          for (const file of req.files[field]) {
            const hashedName = crypto.randomBytes(16).toString("hex");
            let extension = file.originalname.split(".").pop().toLowerCase();
            let fileBuffer = file.buffer;

            // اگر تصویر باشد، تبدیل به WebP شود
            if (["jpg", "jpeg", "png"].includes(extension)) {
              buffer = await sharp(file.buffer)
                .toFormat("webp", { quality: 80, lossless: extension === "png" }) // PNG با شفافیت
                .toBuffer();
              extension = "webp"; // تغییر فرمت
            }

            const filename = `${hashedName}.${extension}`;
            const uniqueKey = `${dateFolder}/${filename}`;

            const result = await s3Client.send(
              new PutObjectCommand({
                Bucket: bucketName,
                Key: uniqueKey,
                Body: fileBuffer,
                ContentType: file.mimetype,
              })
            );

            req.uploadedFiles[field].push({
              url: `${process.env.MINIO_ENDPOINT}/${bucketName}/${uniqueKey}`,
              key: uniqueKey,
              result,
            });
          }
        }

        next();
      } catch (error) {
        console.error("Error uploading to MinIO:", error);
        res.status(500).json({
          acknowledgement: false,
          message: "Internal Server Error",
          description: `خطا در بارگذاری فایل‌ها به MinIO: ${error.message}`,
        });
      }
    });
  };

  return {
    single: (fieldName) => minioUploadMiddleware([{ name: fieldName, maxCount: 1 }]),
    fields: (fieldsConfig) => minioUploadMiddleware(fieldsConfig),
  };
};

module.exports = upload;
