/* internal imports */
const CeremonyType = require("../models/ceremonyType.model");
const Translation = require("../models/translation.model");
const translateFields = require("../utils/translateFields");

exports.addCeremonyType = async (req, res) => {
  try {
    const { title, description, icon } = req.body;

    const ceremonyType = new CeremonyType({
      title,
      icon,
      creator: req.admin._id
    });

    const result = await ceremonyType.save();
    console.log("Saved ceremonyType:", result);
    
    const check = await CeremonyType.findById(result._id);
    console.log("Check in DB:", check);
    
    try {
      const translations = await translateFields(
        {
          title,
          description
        },
        {
          stringFields: ["title", "description"]
        }
      );

      const translationDocs = Object.entries(translations).map(
        ([lang, { fields }]) => ({
          language: lang,
          refModel: "CeremonyType",
          refId: result._id,
          fields
        })
      );

      const insertedTranslations = await Translation.insertMany(translationDocs);

      const translationInfos = insertedTranslations.map((t) => ({
        translation: t._id,
        language: t.language
      }));

      await CeremonyType.findByIdAndUpdate(result._id, {
        $set: { translations: translationInfos }
      });

      return res.status(201).json({
        acknowledgement: true,
        message: "Created",
        description: "نوع مراسم با موفقیت ایجاد و ترجمه شد.",
        data: result
      });
    } catch (translationError) {
      console.log(translationError);
      await CeremonyType.findByIdAndDelete(result._id);
      return res.status(500).json({
        acknowledgement: false,
        message: "Translation Save Error",
        description: "خطا در ذخیره ترجمه‌ها. نوع مراسم حذف شد.",
        error: translationError.message
      });
    }
  } catch (error) {
    console.error("Error adding ceremony type:", error);
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطا در ایجاد نوع مراسم",
      error: error.message
    });
  }
};


exports.getCeremonyTypes = async (req, res) => {
  const { page = 1, limit = 5, search = "" } = req.query;
  const skip = (page - 1) * limit;
console.log(req.locale);
  try {
    let matchedCeremonyTypeIds = [];

    if (search) {
      const translations = await Translation.find({
        language: req.locale,
        refModel: "CeremonyType",
        "fields.title": { $regex: search, $options: "i" }
      }).select("refId");

      matchedCeremonyTypeIds = translations.map((t) => t.refId);
    }

    const query = {
      isDeleted: false,
      ...(search ? { _id: { $in: matchedCeremonyTypeIds } } : {})
    };

    const ceremonyTypes = await CeremonyType.find(query)
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

    const total = await CeremonyType.countDocuments(query);

    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "نوع مراسم‌ها با موفقیت دریافت شدند",
      data: ceremonyTypes,
      total
    });
  } catch (error) {
    console.error("Error fetching ceremony types:", error);
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطا در دریافت نوع مراسم‌ها",
      error: error.message
    });
  }
};


/* 📌 دریافت یک نوع مراسم */
exports.getCeremonyType = async (req, res) => {
  try {
    const ceremonyType = await CeremonyType.findById(req.params.id);

    if (!ceremonyType) {
      return res.status(404).json({
        acknowledgement: false,
        message: "Not Found",
        description: "نوع مراسم مورد نظر یافت نشد"
      });
    }

    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "نوع مراسم با موفقیت دریافت شد",
      data: ceremonyType
    });
  } catch (error) {
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطایی در دریافت نوع مراسم رخ داد",
      error: error.message
    });
  }
};

/* 📌 بروزرسانی نوع مراسم */
exports.updateCeremonyType = async (req, res) => {
  try {
    const updatedCeremonyType = req.body;

    const result = await CeremonyType.findByIdAndUpdate(
      req.params.id,
      updatedCeremonyType,
      {
        new: true
      }
    );

    if (!result) {
      return res.status(404).json({
        acknowledgement: false,
        message: "Not Found",
        description: "نوع مراسم مورد نظر برای بروزرسانی یافت نشد"
      });
    }

    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "نوع مراسم با موفقیت بروزرسانی شد",
      data: result
    });
  } catch (error) {
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطایی در بروزرسانی نوع مراسم رخ داد",
      error: error.message
    });
  }
};

/* 📌 حذف نوع مراسم */
exports.deleteCeremonyType = async (req, res) => {
  try {
    const ceremonyType = await CeremonyType.findByIdAndUpdate(
      req.params.id,
      { isDeleted: true },
      { new: true }
    );
    if (!ceremonyType) {
      return res.status(404).json({
        acknowledgement: false,
        message: "Not Found",
        description: "نوع مراسم مورد نظر برای حذف یافت نشد"
      });
    }

    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "نوع مراسم با موفقیت حذف شد"
    });
  } catch (error) {
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطایی در حذف نوع مراسم رخ داد",
      error: error.message
    });
  }
};
