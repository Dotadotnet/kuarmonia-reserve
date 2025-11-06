const deleteFromCloudinary = require("../middleware/delete.middleware");

const uploadService = {
  // Process uploaded files and return file information
  processUploadedFiles: (req) => {
    const uploadedFiles = {};

    if (req.uploadedFiles) {
      for (const field in req.uploadedFiles) {
        uploadedFiles[field] = req.uploadedFiles[field].map(file => ({
          url: file.url,
          public_id: file.public_id,
          format: file.format,
          resource_type: file.resource_type
        }));
      }
    }

    return uploadedFiles;
  },

  // Get the URL of an uploaded file
  getFileUrl: (uploadedFiles, fieldName) => {
    if (uploadedFiles && uploadedFiles[fieldName] && uploadedFiles[fieldName].length > 0) {
      return uploadedFiles[fieldName][0].url;
    }
    return null;
  },
  
  // add new upload
  addUpload: async (req, res) => {
    try {
      if (!req.uploadedFiles?.file?.[0]) {
        console.log("No file uploaded");
        return res.status(400).json({ 
          acknowledgement: false,
          message: "Error",
          description: "No file uploaded"
        });
      }
      
      const file = req.uploadedFiles.file[0];
      const filePath = file.url;
      
      console.log("File uploaded:", filePath);
      
      return res.status(200).json({ 
        acknowledgement: true,
        message: "Created",
        description: "فایل با موفقیت آپلود شد",
        data: {
          url: filePath,
          public_id: file.public_id,
          format: file.format,
          resource_type: file.resource_type
        }
      });
    } catch (error) {
      console.error("Error uploading file:", error);
      return res.status(500).json({
        acknowledgement: false,
        message: "Error",
        description: "خطا در آپلود فایل",
        error: error.message
      });
    }
  },
  
  // delete upload
  deleteUpload: async (req, res) => {
    try {
      const { public_id, resource_type } = req.body;
      
      if (!public_id) {
        return res.status(400).json({
          acknowledgement: false,
          message: "Bad Request",
          description: "شناسه عمومی فایل الزامی است"
        });
      }
      
      // Delete the file from Cloudinary
      const result = await deleteFromCloudinary(public_id, resource_type || 'image');
      
      res.status(200).json({
        acknowledgement: true,
        message: "Ok",
        description: "فایل با موفقیت حذف شد",
        data: result
      });
    } catch (error) {
      console.error("Error deleting file:", error);
      res.status(500).json({
        acknowledgement: false,
        message: "Error",
        description: "خطا در حذف فایل",
        error: error.message
      });
    }
  }
};

module.exports = uploadService;