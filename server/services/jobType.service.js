const JobType = require("../models/jobType.model");
const remove = require("../utils/remove.util");
const Translation = require("../models/translation.model");
const { generateSlug } = require("../utils/seoUtils");
const translateFields = require("../utils/translateFields");

exports.addJobType = async (req, res) => {
  try {
    const { title, description,icon } = req.body;
    if (!title || !description) {
      return res.status(400).json({
        acknowledgement: false,
        message: "درخواست نادرست",
        description: "همه فیلدها الزامی است",
        isSuccess: false
      });
    }
    const thumbnail = req.uploadedFiles?.thumbnail?.[0]
      ? {
          url: req.uploadedFiles.thumbnail[0].url,
          public_id: req.uploadedFiles.thumbnail[0].key
        }
      : null;

    const jobType = new JobType({
      thumbnail,
      creator: req.admin._id,
      icon: icon
    });

    const result = await jobType.save();
    const slug = await generateSlug(title);

    try {
      const translations = await translateFields(
        {
          title,
          description,
          slug
        },
        {
          stringFields: ["title", "description", "slug"]
        }
      );
      const translationDocs = Object.entries(translations).map(
        ([lang, { fields }]) => ({
          language: lang,
          refModel: "JobType",
          refId: result._id,
          fields
        })
      );
      const insertedTranslations = await Translation.insertMany(
        translationDocs
      );

      const translationInfos = insertedTranslations.map((t) => ({
        translation: t._id,
        language: t.language
      }));
      await JobType.findByIdAndUpdate(result._id, {
        $set: { translations: translationInfos }
      });

      return res.status(201).json({
        acknowledgement: true,
        message: "Created",
        description: "دسته‌بندی شغل با موفقیت ایجاد و ترجمه شد.",
        data: result
      });
    } catch (translationError) {
      console.log(translationError.message);
      await JobType.findByIdAndDelete(result._id);
      return res.status(500).json({
        acknowledgement: false,
        message: "Translation Save Error",
        description: "خطا در ذخیره ترجمه‌ها. دسته‌بندی شغل حذف شد.",
        error: translationError.message
      });
    }
  } catch (error) {
    console.error("Error in addJobType:", error);
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "شغل ها خطا در ایجاد دسته بندی",
      error: error.message
    });
  }
};

exports.getJobTypes = async (req, res) => {
  const { page = 1, limit = 5, search = "" } = req.query;
  const skip = (page - 1) * limit;

  try {
    let matchedJobTypeIds = [];

    if (search) {
      const translations = await Translation.find({
        language: req.locale,
        refModel: "JobType",
        "fields.title": { $regex: search, $options: "i" }
      }).select("refId");

      matchedJobTypeIds = translations.map((t) => t.refId);
    }

    const query = {
      isDeleted: false,
      ...(search ? { _id: { $in: matchedJobTypeIds } } : {})
    };

    const jobTypes = await JobType.find(query)
      .skip(skip)
      .limit(Number(limit))
      .sort({ createdAt: -1 })
      .populate([
        {
          path: "translations.translation",
          match: { language: req.locale }
        },
        {
          path: "creator",
          select: "name avatar"
        }
      ]);

    const total = await JobType.countDocuments(query);

    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "دسته بندی شغل ها با موفقیت دریافت شدند",
      data: jobTypes,
      total
    });
  } catch (error) {
    console.error("Error fetching jobTypes:", error);
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطا در دریافت دسته بندی ها",
      error: error.message
    });
  }
};

/* get a jobType */
exports.getJobType = async (req, res) => {
  const jobType = await JobType.findById(req.params.id);
  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "دسته بندی با موفقیت دریافت شد",
    data: jobType
  });
};

/* update jobType */
exports.updateJobType = async (req, res) => {
  try {
    const jobType = await JobType.findById(req.params.id);

    if (!jobType) {
      return res.status(404).json({
        acknowledgement: false,
        message: "Not Found",
        description: "دسته‌بندی پیدا نشد"
      });
    }

    let updatedJobType = req.body;
    // حذف تصویر قبلی در صورت آپلود جدید
    if (!req.body.thumbnail && req.file) {
      if (jobType.thumbnail?.public_id) {
        await remove(jobType.thumbnail.public_id);
      }

      updatedJobType.thumbnail = {
        url: req.file.path,
        public_id: req.file.filename
      };
    }

    const translatableFields = ["title", "description"];

    const changedFields = translatableFields.filter(
      (field) =>
        updatedJobType[field] && updatedJobType[field] !== jobType[field]
    );

    if (changedFields.length > 0) {
      const translations = await translateFields(updatedJobType, changedFields);

      for (const [language, { fields }] of Object.entries(translations)) {
        await Translation.findOneAndUpdate(
          {
            language,
            refModel: "JobType",
            refId: jobType._id
          },
          { fields },
          { upsert: true, new: true }
        );
      }
    }
    console.log("Updated JobType:", updatedJobType);
    await JobType.findByIdAndUpdate(req.params.id, updatedJobType);

    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "دسته‌بندی با موفقیت ویرایش شد"
    });
  } catch (error) {
    console.error("Error in updateJobType:", error);
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطا در بروزرسانی دسته‌بندی",
      error: error.message
    });
  }
};
/* delete jobType */
exports.deleteJobType = async (req, res) => {
  const jobType = await JobType.findByIdAndUpdate(
    req.params.id,
    {
      isDeleted: true,
      deletedAt: Date.now()
    },
    { new: true }
  );

  if (!jobType) {
    return res.status(404).json({
      acknowledgement: false,
      message: "دسته بندی پیدا نشد",
      description: "دسته بندی  که می‌خواهید حذف کنید، وجود ندارد"
    });
  }

  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "دسته بندی با موفقیت حذف شد"
  });
};
