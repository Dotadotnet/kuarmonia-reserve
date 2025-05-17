const InstitutionType = require("../models/institutionType.model");
const remove = require("../utils/remove.util");
const Translation = require("../models/translation.model");
const { generateSlug } = require("../utils/seoUtils");
const translateFields = require("../utils/translateFields");

exports.addInstitutionType = async (req, res) => {
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

    const institutionType = new InstitutionType({
      creator: req.admin._id,

    });

    const result = await institutionType.save();
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
          refModel: "InstitutionType",
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
      await InstitutionType.findByIdAndUpdate(result._id, {
        $set: { translations: translationInfos }
      });

      return res.status(201).json({
        acknowledgement: true,
        message: "Created",
        description: "نوع مرکز علمی با موفقیت ایجاد و ترجمه شد.",
        data: result
      });
    } catch (translationError) {
      console.log(translationError.message);
      await InstitutionType.findByIdAndDelete(result._id);
      return res.status(500).json({
        acknowledgement: false,
        message: "Translation Save Error",
        description: "خطا در ذخیره ترجمه‌ها. نوع مرکز علمی حذف شد.",
        error: translationError.message
      });
    }
  } catch (error) {
    console.error("Error in addInstitutionType:", error);
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطا در ایجاد نوع مرکز علمی",
      error: error.message
    });
  }
};


exports.getInstitutionTypes = async (req, res) => {
  const { page = 1, limit = 5, search = "" } = req.query;
  const skip = (page - 1) * limit;

  try {
    let matchedInstitutionTypeIds = [];

    if (search) {
      const translations = await Translation.find({
        language: req.locale,
        refModel: "InstitutionType",
        "fields.title": { $regex: search, $options: "i" }
      }).select("refId");

      matchedInstitutionTypeIds = translations.map((t) => t.refId);
    }

    const query = {
      isDeleted: false,
      ...(search ? { _id: { $in: matchedInstitutionTypeIds } } : {})
    };

    const institutionTypes = await InstitutionType.find(query)
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

    const total = await InstitutionType.countDocuments(query);

    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "نوع مرکز علمی  ها با موفقیت دریافت شدند",
      data: institutionTypes,
      total
    });
  } catch (error) {
    console.error("Error fetching institutionTypes:", error);
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطا در دریافت نوع مرکز علمی ها",
      error: error.message
    });
  }
};


/* get a institutionType */
exports.getInstitutionType = async (req, res) => {
  const institutionType = await InstitutionType.findById(req.params.id);
  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "نوع مرکز علمی با موفقیت دریافت شد",
    data: institutionType
  });
};

/* update institutionType */
exports.updateInstitutionType = async (req, res) => {
  try {
    const institutionType = await InstitutionType.findById(req.params.id);

    if (!institutionType) {
      return res.status(404).json({
        acknowledgement: false,
        message: "Not Found",
        description: "زمان‌بندی  پیدا نشد"
      });
    }

    let updatedInstitutionType = req.body;
    // حذف تصویر قبلی در صورت آپلود جدید
    if (!req.body.thumbnail && req.file) {
      if (institutionType.thumbnail?.public_id) {
        await remove(institutionType.thumbnail.public_id);
      }

      updatedInstitutionType.thumbnail = {
        url: req.file.path,
        public_id: req.file.filename
      };
    }

    const translatableFields = ["title", "description"];

    const changedFields = translatableFields.filter(
      (field) =>
        updatedInstitutionType[field] && updatedInstitutionType[field] !== institutionType[field]
    );

    if (changedFields.length > 0) {
      const translations = await translateFields(
        updatedInstitutionType,
        changedFields
      );

      for (const [language, { fields }] of Object.entries(translations)) {
        await Translation.findOneAndUpdate(
          {
            language,
            refModel: "InstitutionType",
            refId: institutionType._id
          },
          { fields },
          { upsert: true, new: true }
        );
      }
    }
    console.log("Updated InstitutionType:", updatedInstitutionType);
    await InstitutionType.findByIdAndUpdate(req.params.id, updatedInstitutionType);

    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "زمان‌بندی  با موفقیت ویرایش شد"
    });
  } catch (error) {
    console.error("Error in updateInstitutionType:", error);
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطا در بروزرسانی زمان‌بندی ",
      error: error.message
    });
  }
};
/* delete institutionType */
exports.deleteInstitutionType = async (req, res) => {
  const institutionType = await InstitutionType.findByIdAndUpdate(
    req.params.id,
    {
      isDeleted: true,
      deletedAt: Date.now()
    },
    { new: true }
  );

  if (!institutionType) {
    return res.status(404).json({
      acknowledgement: false,
      message: "نوع مرکز علمی پیدا نشد",
      description: "نوع مرکز علمی  که می‌خواهید حذف کنید، وجود ندارد"
    });
  }

  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "نوع مرکز علمی با موفقیت حذف شد"
  });
};
