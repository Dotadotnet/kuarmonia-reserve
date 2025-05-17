const ExperienceLevel = require("../models/experienceLevel.model");
const remove = require("../utils/remove.util");
const Translation = require("../models/translation.model");
const { generateSlug } = require("../utils/seoUtils");
const translateFields = require("../utils/translateFields");

exports.addExperienceLevel = async (req, res) => {
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

    const experienceLevel = new ExperienceLevel({
      creator: req.admin._id,

    });

    const result = await experienceLevel.save();
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
          refModel: "ExperienceLevel",
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
      await ExperienceLevel.findByIdAndUpdate(result._id, {
        $set: { translations: translationInfos }
      });

      return res.status(201).json({
        acknowledgement: true,
        message: "Created",
        description: " سطح تجربه کاری   با موفقیت ایجاد و ترجمه شد.",
        data: result
      });
    } catch (translationError) {
      console.log(translationError.message);
      await ExperienceLevel.findByIdAndDelete(result._id);
      return res.status(500).json({
        acknowledgement: false,
        message: "Translation Save Error",
        description: "خطا در ذخیره ترجمه‌ها.سطح تجربه کاری   حذف شد.",
        error: translationError.message
      });
    }
  } catch (error) {
    console.error("Error in addExperienceLevel:", error);
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: " ها خطا در ایجادسطح تجربه کاری",
      error: error.message
    });
  }
};


exports.getExperienceLevels = async (req, res) => {
  const { page = 1, limit = 5, search = "" } = req.query;
  const skip = (page - 1) * limit;

  try {
    let matchedExperienceLevelIds = [];

    if (search) {
      const translations = await Translation.find({
        language: req.locale,
        refModel: "ExperienceLevel",
        "fields.title": { $regex: search, $options: "i" }
      }).select("refId");

      matchedExperienceLevelIds = translations.map((t) => t.refId);
    }

    const query = {
      isDeleted: false,
      ...(search ? { _id: { $in: matchedExperienceLevelIds } } : {})
    };

    const experienceLevels = await ExperienceLevel.find(query)
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

    const total = await ExperienceLevel.countDocuments(query);

    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: " سطح تجربه کاری  ها با موفقیت دریافت شدند",
      data: experienceLevels,
      total
    });
  } catch (error) {
    console.error("Error fetching experienceLevels:", error);
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطا در دریافتسطح تجربه کاری ها",
      error: error.message
    });
  }
};

/* get a experienceLevel */
exports.getExperienceLevel = async (req, res) => {
  const experienceLevel = await ExperienceLevel.findById(req.params.id);
  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: " سطح تجربه کاری با موفقیت دریافت شد",
    data: experienceLevel
  });
};

/* update experienceLevel */
exports.updateExperienceLevel = async (req, res) => {
  try {
    const experienceLevel = await ExperienceLevel.findById(req.params.id);

    if (!experienceLevel) {
      return res.status(404).json({
        acknowledgement: false,
        message: "Not Found",
        description: " سطح تجربه کاری  پیدا نشد"
      });
    }

    let updatedExperienceLevel = req.body;
    // حذف تصویر قبلی در صورت آپلود جدید
    if (!req.body.thumbnail && req.file) {
      if (experienceLevel.thumbnail?.public_id) {
        await remove(experienceLevel.thumbnail.public_id);
      }

      updatedExperienceLevel.thumbnail = {
        url: req.file.path,
        public_id: req.file.filename
      };
    }

    const translatableFields = ["title", "description"];

    const changedFields = translatableFields.filter(
      (field) =>
        updatedExperienceLevel[field] && updatedExperienceLevel[field] !== experienceLevel[field]
    );

    if (changedFields.length > 0) {
      const translations = await translateFields(
        updatedExperienceLevel,
        changedFields
      );

      for (const [language, { fields }] of Object.entries(translations)) {
        await Translation.findOneAndUpdate(
          {
            language,
            refModel: "ExperienceLevel",
            refId: experienceLevel._id
          },
          { fields },
          { upsert: true, new: true }
        );
      }
    }
    console.log("Updated ExperienceLevel:", updatedExperienceLevel);
    await ExperienceLevel.findByIdAndUpdate(req.params.id, updatedExperienceLevel);

    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: " سطح تجربه کاری  با موفقیت ویرایش شد"
    });
  } catch (error) {
    console.error("Error in updateExperienceLevel:", error);
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطا در بروزرسانیسطح تجربه کاری ",
      error: error.message
    });
  }
};
/* delete experienceLevel */
exports.deleteExperienceLevel = async (req, res) => {
  const experienceLevel = await ExperienceLevel.findByIdAndUpdate(
    req.params.id,
    {
      isDeleted: true,
      deletedAt: Date.now()
    },
    { new: true }
  );

  if (!experienceLevel) {
    return res.status(404).json({
      acknowledgement: false,
      message: " سطح تجربه کاری پیدا نشد",
      description: " سطح تجربه کاری  که می‌خواهید حذف کنید، وجود ندارد"
    });
  }

  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: " سطح تجربه کاری با موفقیت حذف شد"
  });
};
