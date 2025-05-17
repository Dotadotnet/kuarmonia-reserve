const CitizenshipOutcome = require("../models/citizenshipOutcome.model");
const remove = require("../utils/remove.util");
const Translation = require("../models/translation.model");
const { generateSlug } = require("../utils/seoUtils");
const translateFields = require("../utils/translateFields");

exports.addCitizenshipOutcome = async (req, res) => {
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

    const citizenshipOutcome = new CitizenshipOutcome({
      creator: req.admin._id,

    });

    const result = await citizenshipOutcome.save();
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
          refModel: "CitizenshipOutcome",
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
      await CitizenshipOutcome.findByIdAndUpdate(result._id, {
        $set: { translations: translationInfos }
      });

      return res.status(201).json({
        acknowledgement: true,
        message: "Created",
        description: "نتیجه اقامت با موفقیت ایجاد و ترجمه شد.",
        data: result
      });
    } catch (translationError) {
      console.log(translationError.message);
      await CitizenshipOutcome.findByIdAndDelete(result._id);
      return res.status(500).json({
        acknowledgement: false,
        message: "Translation Save Error",
        description: "خطا در ذخیره ترجمه‌ها. نتیجه اقامت حذف شد.",
        error: translationError.message
      });
    }
  } catch (error) {
    console.error("Error in addCitizenshipOutcome:", error);
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: " ها خطا در ایجاد نتیجه اقامت",
      error: error.message
    });
  }
};


exports.getCitizenshipOutcomes = async (req, res) => {
  const { page = 1, limit = 5, search = "" } = req.query;
  const skip = (page - 1) * limit;

  try {
    let matchedCitizenshipOutcomeIds = [];

    if (search) {
      const translations = await Translation.find({
        language: req.locale,
        refModel: "CitizenshipOutcome",
        "fields.title": { $regex: search, $options: "i" }
      }).select("refId");

      matchedCitizenshipOutcomeIds = translations.map((t) => t.refId);
    }

    const query = {
      isDeleted: false,
      ...(search ? { _id: { $in: matchedCitizenshipOutcomeIds } } : {})
    };

    const citizenshipOutcomes = await CitizenshipOutcome.find(query)
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

    const total = await CitizenshipOutcome.countDocuments(query);

    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "نتیجه اقامت  ها با موفقیت دریافت شدند",
      data: citizenshipOutcomes,
      total
    });
  } catch (error) {
    console.error("Error fetching citizenshipOutcomes:", error);
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطا در دریافت نتیجه اقامت ها",
      error: error.message
    });
  }
};

/* get a citizenshipOutcome */
exports.getCitizenshipOutcome = async (req, res) => {
  const citizenshipOutcome = await CitizenshipOutcome.findById(req.params.id);
  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "نتیجه اقامت با موفقیت دریافت شد",
    data: citizenshipOutcome
  });
};

/* update citizenshipOutcome */
exports.updateCitizenshipOutcome = async (req, res) => {
  try {
    const citizenshipOutcome = await CitizenshipOutcome.findById(req.params.id);

    if (!citizenshipOutcome) {
      return res.status(404).json({
        acknowledgement: false,
        message: "Not Found",
        description: "زمان‌بندی  پیدا نشد"
      });
    }

    let updatedCitizenshipOutcome = req.body;
    // حذف تصویر قبلی در صورت آپلود جدید
    if (!req.body.thumbnail && req.file) {
      if (citizenshipOutcome.thumbnail?.public_id) {
        await remove(citizenshipOutcome.thumbnail.public_id);
      }

      updatedCitizenshipOutcome.thumbnail = {
        url: req.file.path,
        public_id: req.file.filename
      };
    }

    const translatableFields = ["title", "description"];

    const changedFields = translatableFields.filter(
      (field) =>
        updatedCitizenshipOutcome[field] && updatedCitizenshipOutcome[field] !== citizenshipOutcome[field]
    );

    if (changedFields.length > 0) {
      const translations = await translateFields(
        updatedCitizenshipOutcome,
        changedFields
      );

      for (const [language, { fields }] of Object.entries(translations)) {
        await Translation.findOneAndUpdate(
          {
            language,
            refModel: "CitizenshipOutcome",
            refId: citizenshipOutcome._id
          },
          { fields },
          { upsert: true, new: true }
        );
      }
    }
    console.log("Updated CitizenshipOutcome:", updatedCitizenshipOutcome);
    await CitizenshipOutcome.findByIdAndUpdate(req.params.id, updatedCitizenshipOutcome);

    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "زمان‌بندی  با موفقیت ویرایش شد"
    });
  } catch (error) {
    console.error("Error in updateCitizenshipOutcome:", error);
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطا در بروزرسانی زمان‌بندی ",
      error: error.message
    });
  }
};
/* delete citizenshipOutcome */
exports.deleteCitizenshipOutcome = async (req, res) => {
  const citizenshipOutcome = await CitizenshipOutcome.findByIdAndUpdate(
    req.params.id,
    {
      isDeleted: true,
      deletedAt: Date.now()
    },
    { new: true }
  );

  if (!citizenshipOutcome) {
    return res.status(404).json({
      acknowledgement: false,
      message: "نتیجه اقامت پیدا نشد",
      description: "نتیجه اقامت  که می‌خواهید حذف کنید، وجود ندارد"
    });
  }

  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "نتیجه اقامت با موفقیت حذف شد"
  });
};
