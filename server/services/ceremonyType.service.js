/* internal imports */
const CeremonyType = require("../models/ceremonyType.model");
const Translation = require("../models/translation.model");
const translateFields = require("../utils/translateFields");

exports.addCeremonyType = async (req, res) => {
  try {
    const { title, description, icon } = req.body;
    try {
      translations = await translateFields({ title, description }, [
        "title",
        "description"
      ]);
    } catch (err) {
      console.error("خطا در ترجمه:", err.message);
      return res.status(500).json({
        acknowledgement: false,
        message: "Error",
        description: "خطا در ترجمه",
        error: err.message
      });
    }

    const ceremonyType = new CeremonyType({
      title,
      description,
      icon,
      creator: req.admin._id
    });

    const result = await ceremonyType.save();
    const translationDocs = Object.entries(translations).map(
      ([lang, { fields }]) => ({
        language: lang,
        refModel: "CeremonyType",
        refId: result._id,
        fields
      })
    );
    let insertedTranslations;
    try {
      insertedTranslations = await Translation.insertMany(translationDocs);

      const translationIds = insertedTranslations.map((t) => t._id);

      await CeremonyType.findByIdAndUpdate(result._id, {
        $set: { translations: translationIds }
      });

      return res.status(201).json({
        acknowledgement: true,
        message: "Created",
        description: "نوع مراسم با موفقیت ایجاد و ترجمه شد.",
        data: result
      });
    } catch (translationError) {
      await CeremonyType.findByIdAndDelete(result._id);
      return res.status(500).json({
        acknowledgement: false,
        message: "Translation Save Error",
        description: "خطا در ذخیره ترجمه‌ها. نوع مراسم حذف شد.",
        error: translationError.message
      });
    }
   
  } catch (error) {
    console.log(error);
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطایی در ثبت نوع مراسم رخ داد",
      error: error.message
    });
  }
};

/* 📌 دریافت همه نوع مراسمها */
exports.getCeremonyTypes = async (res) => {
  const ceremonyTypes = await CeremonyType.find({ isDeleted: false }).populate(
    "creator"
  );
  res.status(200).json({
    acknowledgement: true,
    message: "OK",
    description: "دریافت موفق نوع مراسمات",
    data: ceremonyTypes
  });
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
