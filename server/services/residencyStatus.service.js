const ResidencyStatus = require("../models/residencyStatus.model");
const remove = require("../utils/remove.util");
const Translation = require("../models/translation.model");
const { generateSlug } = require("../utils/seoUtils");
const translateFields = require("../utils/translateFields");

exports.addResidencyStatus = async (req, res) => {
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

    const residencyStatus = new ResidencyStatus({
      creator: req.admin._id,

    });

    const result = await residencyStatus.save();
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
          refModel: "ResidencyStatus",
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
      await ResidencyStatus.findByIdAndUpdate(result._id, {
        $set: { translations: translationInfos }
      });

      return res.status(201).json({
        acknowledgement: true,
        message: "Created",
        description: " وضعیت اقامت   با موفقیت ایجاد و ترجمه شد.",
        data: result
      });
    } catch (translationError) {
      console.log(translationError.message);
      await ResidencyStatus.findByIdAndDelete(result._id);
      return res.status(500).json({
        acknowledgement: false,
        message: "Translation Save Error",
        description: "خطا در ذخیره ترجمه‌ها.وضعیت اقامت   حذف شد.",
        error: translationError.message
      });
    }
  } catch (error) {
    console.error("Error in addResidencyStatus:", error);
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: " ها خطا در ایجادوضعیت اقامت",
      error: error.message
    });
  }
};


exports.getResidencyStatuss = async (req, res) => {
  const { page = 1, limit = 5, search = "" } = req.query;
  const skip = (page - 1) * limit;

  try {
    let matchedResidencyStatusIds = [];

    if (search) {
      const translations = await Translation.find({
        language: req.locale,
        refModel: "ResidencyStatus",
        "fields.title": { $regex: search, $options: "i" }
      }).select("refId");

      matchedResidencyStatusIds = translations.map((t) => t.refId);
    }

    const query = {
      isDeleted: false,
      ...(search ? { _id: { $in: matchedResidencyStatusIds } } : {})
    };

    const residencyStatuss = await ResidencyStatus.find(query)
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

    const total = await ResidencyStatus.countDocuments(query);

    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: " وضعیت اقامت  ها با موفقیت دریافت شدند",
      data: residencyStatuss,
      total
    });
  } catch (error) {
    console.error("Error fetching residencyStatuss:", error);
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطا در دریافتوضعیت اقامت ها",
      error: error.message
    });
  }
};

/* get a residencyStatus */
exports.getResidencyStatus = async (req, res) => {
  const residencyStatus = await ResidencyStatus.findById(req.params.id);
  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: " وضعیت اقامت با موفقیت دریافت شد",
    data: residencyStatus
  });
};

/* update residencyStatus */
exports.updateResidencyStatus = async (req, res) => {
  try {
    const residencyStatus = await ResidencyStatus.findById(req.params.id);

    if (!residencyStatus) {
      return res.status(404).json({
        acknowledgement: false,
        message: "Not Found",
        description: " وضعیت اقامت  پیدا نشد"
      });
    }

    let updatedResidencyStatus = req.body;
    // حذف تصویر قبلی در صورت آپلود جدید
    if (!req.body.thumbnail && req.file) {
      if (residencyStatus.thumbnail?.public_id) {
        await remove(residencyStatus.thumbnail.public_id);
      }

      updatedResidencyStatus.thumbnail = {
        url: req.file.path,
        public_id: req.file.filename
      };
    }

    const translatableFields = ["title", "description"];

    const changedFields = translatableFields.filter(
      (field) =>
        updatedResidencyStatus[field] && updatedResidencyStatus[field] !== residencyStatus[field]
    );

    if (changedFields.length > 0) {
      const translations = await translateFields(
        updatedResidencyStatus,
        changedFields
      );

      for (const [language, { fields }] of Object.entries(translations)) {
        await Translation.findOneAndUpdate(
          {
            language,
            refModel: "ResidencyStatus",
            refId: residencyStatus._id
          },
          { fields },
          { upsert: true, new: true }
        );
      }
    }
    console.log("Updated ResidencyStatus:", updatedResidencyStatus);
    await ResidencyStatus.findByIdAndUpdate(req.params.id, updatedResidencyStatus);

    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: " وضعیت اقامت  با موفقیت ویرایش شد"
    });
  } catch (error) {
    console.error("Error in updateResidencyStatus:", error);
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطا در بروزرسانیوضعیت اقامت ",
      error: error.message
    });
  }
};
/* delete residencyStatus */
exports.deleteResidencyStatus = async (req, res) => {
  const residencyStatus = await ResidencyStatus.findByIdAndUpdate(
    req.params.id,
    {
      isDeleted: true,
      deletedAt: Date.now()
    },
    { new: true }
  );

  if (!residencyStatus) {
    return res.status(404).json({
      acknowledgement: false,
      message: " وضعیت اقامت پیدا نشد",
      description: " وضعیت اقامت  که می‌خواهید حذف کنید، وجود ندارد"
    });
  }

  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: " وضعیت اقامت با موفقیت حذف شد"
  });
};
