const JobMode = require("../models/jobMode.model");
const remove = require("../utils/remove.util");
const Translation = require("../models/translation.model");
const { generateSlug } = require("../utils/seoUtils");
const translateFields = require("../utils/translateFields");

exports.addJobMode = async (req, res) => {
  try {
    const { title, description} = req.body;
    if (!title || !description ) {
      return res.status(400).json({
        acknowledgement: false,
        message: "درخواست نادرست",
        description: "همه فیلدها الزامی است",
        isSuccess: false
      });
    }

    const jobMode = new JobMode({
      creator: req.admin._id,

    });

    const result = await jobMode.save();
    const slug = await generateSlug(title);

    try {
      const translations = await translateFields(
        {
          title,
          description,
          slug,
        },
        {
          stringFields: ["title", "description", "slug"]
        }
      );
      const translationDocs = Object.entries(translations).map(
        ([lang, { fields }]) => ({
          language: lang,
          refModel: "JobMode",
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
      await JobMode.findByIdAndUpdate(result._id, {
        $set: { translations: translationInfos }
      });

      return res.status(201).json({
        acknowledgement: true,
        message: "Created",
        description: "نوع حضور با موفقیت ایجاد و ترجمه شد.",
        data: result
      });
    } catch (translationError) {
      console.log(translationError.message);
      await JobMode.findByIdAndDelete(result._id);
      return res.status(500).json({
        acknowledgement: false,
        message: "Translation Save Error",
        description: "خطا در ذخیره ترجمه‌ها. نوع حضور حذف شد.",
        error: translationError.message
      });
    }
  } catch (error) {
    console.error("Error in addJobMode:", error);
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "شغل ها خطا در ایجاد نوع حضور",
      error: error.message
    });
  }
};


exports.getJobModes = async (req, res) => {
  const { page = 1, limit = 5, search = "" } = req.query;
  const skip = (page - 1) * limit;

  try {
    let matchedJobModeIds = [];

    if (search) {
      const translations = await Translation.find({
        language: req.locale,
        refModel: "JobMode",
        "fields.title": { $regex: search, $options: "i" }
      }).select("refId");

      matchedJobModeIds = translations.map((t) => t.refId);
    }

    const query = {
      isDeleted: false,
      ...(search ? { _id: { $in: matchedJobModeIds } } : {})
    };

    const jobModes = await JobMode.find(query)
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

    const total = await JobMode.countDocuments(query);

    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "نوع حضور شغل ها با موفقیت دریافت شدند",
      data: jobModes,
      total
    });
  } catch (error) {
    console.error("Error fetching jobModes:", error);
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطا در دریافت نوع حضور ها",
      error: error.message
    });
  }
};


/* get a jobMode */
exports.getJobMode = async (req, res) => {
  const jobMode = await JobMode.findById(req.params.id);
  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "نوع حضور با موفقیت دریافت شد",
    data: jobMode
  });
};

/* update jobMode */
exports.updateJobMode = async (req, res) => {
  try {
    const jobMode = await JobMode.findById(req.params.id);

    if (!jobMode) {
      return res.status(404).json({
        acknowledgement: false,
        message: "Not Found",
        description: "زمان‌بندی  پیدا نشد"
      });
    }

    let updatedJobMode = req.body;
    // حذف تصویر قبلی در صورت آپلود جدید
    if (!req.body.thumbnail && req.file) {
      if (jobMode.thumbnail?.public_id) {
        await remove(jobMode.thumbnail.public_id);
      }

      updatedJobMode.thumbnail = {
        url: req.file.path,
        public_id: req.file.filename
      };
    }

    const translatableFields = ["title", "description"];

    const changedFields = translatableFields.filter(
      (field) =>
        updatedJobMode[field] && updatedJobMode[field] !== jobMode[field]
    );

    if (changedFields.length > 0) {
      const translations = await translateFields(
        updatedJobMode,
        changedFields
      );

      for (const [language, { fields }] of Object.entries(translations)) {
        await Translation.findOneAndUpdate(
          {
            language,
            refModel: "JobMode",
            refId: jobMode._id
          },
          { fields },
          { upsert: true, new: true }
        );
      }
    }
    console.log("Updated JobMode:", updatedJobMode);
    await JobMode.findByIdAndUpdate(req.params.id, updatedJobMode);

    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "زمان‌بندی  با موفقیت ویرایش شد"
    });
  } catch (error) {
    console.error("Error in updateJobMode:", error);
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطا در بروزرسانی زمان‌بندی ",
      error: error.message
    });
  }
};
/* delete jobMode */
exports.deleteJobMode = async (req, res) => {
  const jobMode = await JobMode.findByIdAndUpdate(
    req.params.id,
    {
      isDeleted: true,
      deletedAt: Date.now()
    },
    { new: true }
  );

  if (!jobMode) {
    return res.status(404).json({
      acknowledgement: false,
      message: "نوع حضور پیدا نشد",
      description: "نوع حضور  که می‌خواهید حذف کنید، وجود ندارد"
    });
  }

  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "نوع حضور با موفقیت حذف شد"
  });
};
