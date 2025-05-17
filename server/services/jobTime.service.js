const JobTime = require("../models/jobTime.model");
const remove = require("../utils/remove.util");
const Translation = require("../models/translation.model");
const { generateSlug } = require("../utils/seoUtils");
const translateFields = require("../utils/translateFields");

exports.addJobTime = async (req, res) => {
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

    const jobTime = new JobTime({
      creator: req.admin._id,

    });

    const result = await jobTime.save();
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
          refModel: "JobTime",
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
      await JobTime.findByIdAndUpdate(result._id, {
        $set: { translations: translationInfos }
      });

      return res.status(201).json({
        acknowledgement: true,
        message: "Created",
        description: "زمان‌بندی  شغل با موفقیت ایجاد و ترجمه شد.",
        data: result
      });
    } catch (translationError) {
      console.log(translationError.message);
      await JobTime.findByIdAndDelete(result._id);
      return res.status(500).json({
        acknowledgement: false,
        message: "Translation Save Error",
        description: "خطا در ذخیره ترجمه‌ها. زمان‌بندی  شغل حذف شد.",
        error: translationError.message
      });
    }
  } catch (error) {
    console.error("Error in addJobTime:", error);
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "شغل ها خطا در ایجاد زمان بندی شغل",
      error: error.message
    });
  }
};


exports.getJobTimes = async (req, res) => {
  const { page = 1, limit = 5, search = "" } = req.query;
  const skip = (page - 1) * limit;

  try {
    let matchedJobTimeIds = [];

    if (search) {
      const translations = await Translation.find({
        language: req.locale,
        refModel: "JobTime",
        "fields.title": { $regex: search, $options: "i" }
      }).select("refId");

      matchedJobTimeIds = translations.map((t) => t.refId);
    }

    const query = {
      isDeleted: false,
      ...(search ? { _id: { $in: matchedJobTimeIds } } : {})
    };

    const jobTimes = await JobTime.find(query)
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

    const total = await JobTime.countDocuments(query);

    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "زمان بندی شغل شغل ها با موفقیت دریافت شدند",
      data: jobTimes,
      total
    });
  } catch (error) {
    console.error("Error fetching jobTimes:", error);
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطا در دریافت زمان بندی شغل ها",
      error: error.message
    });
  }
};


/* get a jobTime */
exports.getJobTime = async (req, res) => {
  const jobTime = await JobTime.findById(req.params.id);
  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "زمان بندی شغل با موفقیت دریافت شد",
    data: jobTime
  });
};

/* update jobTime */
exports.updateJobTime = async (req, res) => {
  try {
    const jobTime = await JobTime.findById(req.params.id);

    if (!jobTime) {
      return res.status(404).json({
        acknowledgement: false,
        message: "Not Found",
        description: "زمان‌بندی  پیدا نشد"
      });
    }

    let updatedJobTime = req.body;
    // حذف تصویر قبلی در صورت آپلود جدید
    if (!req.body.thumbnail && req.file) {
      if (jobTime.thumbnail?.public_id) {
        await remove(jobTime.thumbnail.public_id);
      }

      updatedJobTime.thumbnail = {
        url: req.file.path,
        public_id: req.file.filename
      };
    }

    const translatableFields = ["title", "description"];

    const changedFields = translatableFields.filter(
      (field) =>
        updatedJobTime[field] && updatedJobTime[field] !== jobTime[field]
    );

    if (changedFields.length > 0) {
      const translations = await translateFields(
        updatedJobTime,
        changedFields
      );

      for (const [language, { fields }] of Object.entries(translations)) {
        await Translation.findOneAndUpdate(
          {
            language,
            refModel: "JobTime",
            refId: jobTime._id
          },
          { fields },
          { upsert: true, new: true }
        );
      }
    }
    console.log("Updated JobTime:", updatedJobTime);
    await JobTime.findByIdAndUpdate(req.params.id, updatedJobTime);

    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "زمان‌بندی  با موفقیت ویرایش شد"
    });
  } catch (error) {
    console.error("Error in updateJobTime:", error);
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطا در بروزرسانی زمان‌بندی ",
      error: error.message
    });
  }
};
/* delete jobTime */
exports.deleteJobTime = async (req, res) => {
  const jobTime = await JobTime.findByIdAndUpdate(
    req.params.id,
    {
      isDeleted: true,
      deletedAt: Date.now()
    },
    { new: true }
  );

  if (!jobTime) {
    return res.status(404).json({
      acknowledgement: false,
      message: "زمان بندی شغل پیدا نشد",
      description: "زمان بندی شغل  که می‌خواهید حذف کنید، وجود ندارد"
    });
  }

  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "زمان بندی شغل با موفقیت حذف شد"
  });
};
