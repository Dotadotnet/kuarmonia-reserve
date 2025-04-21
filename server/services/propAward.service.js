/* internal imports */
const PropAward = require("../models/propAward.model");
const Translation = require("../models/translation.model");
const translateFields = require("../utils/translateFields");

/* 📌 اضافه کردن جایزه  جدید */
exports.addPropAward = async (req, res) => {
  try {
    const { title, description, country, issuingOrganization, ...otherInfo } =
      req.body;
    let thumbnail = null;
    let translations;
    try {
      translations = await translateFields(
        { title, description, issuingOrganization, country },
        ["title", "description", "country", "issuingOrganization"]
      );
    } catch (err) {
      console.error("خطا در ترجمه:", err.message);
      return res.status(500).json({
        acknowledgement: false,
        message: "Error",
        description: "خطا در ترجمه",
        error: err.message
      });
    }
    if (req.uploadedFiles["thumbnail"]?.length) {
      thumbnail = {
        url: req.uploadedFiles["thumbnail"][0].url,
        public_id: req.uploadedFiles["thumbnail"][0].key
      };
    }
    const propAward = new PropAward({
      ...otherInfo,
      title,
      description,
      country,
      issuingOrganization,
      thumbnail,
      creator: req.admin._id
    });

    const result = await propAward.save();
    const translationDocs = Object.entries(translations).map(
      ([lang, { fields }]) => ({
        language: lang,
        refModel: "PropAward",
        refId: result._id,
        fields
      })
    );

    try {
      await Translation.insertMany(translationDocs);
    } catch (translationError) {
      await PropAward.findByIdAndDelete(result._id);
      return res.status(500).json({
        acknowledgement: false,
        message: "Translation Save Error",
        description: "خطا در ذخیره ترجمه‌ها.  جایزه حذف شد.",
        error: translationError.message
      });
    }
    res.status(201).json({
      acknowledgement: true,
      message: "Created",
      description: "جایزه  با موفقیت ایجاد شد",
      data: result
    });
  } catch (error) {
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطایی در ثبت جایزه  رخ داد",
      error: error.message
    });
  }
};

/* 📌 دریافت همه جایزه ها */
exports.getPropAwards = async (res) => {
  try {
    const propAwards = await PropAward.find({ isDeleted: false }).populate(
      "creator"
    );
    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "لیست  جوایز با موفقیت دریافت شد",
      data: propAwards
    });
  } catch (error) {
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطایی در دریافت جوایز  رخ داد",
      error: error.message
    });
  }
};

/* 📌 دریافت یک جایزه  */
exports.getPropAward = async (req, res) => {
  try {
    const propAward = await PropAward.findById(req.params.id);

    if (!propAward) {
      return res.status(404).json({
        acknowledgement: false,
        message: "Not Found",
        description: "جایزه  مورد نظر یافت نشد"
      });
    }

    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "جایزه  با موفقیت دریافت شد",
      data: propAward
    });
  } catch (error) {
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطایی در دریافت جایزه  رخ داد",
      error: error.message
    });
  }
};

/* 📌 بروزرسانی جایزه  */
exports.updatePropAward = async (req, res) => {
  try {
    const updatedPropAward = req.body;
    console.log("Updated PropAward:", updatedPropAward);
    console.log("PropAward ID:", req.params.id);

    const result = await PropAward.findByIdAndUpdate(
      req.params.id,
      updatedPropAward,
      {
        new: true
      }
    );

    if (!result) {
      return res.status(404).json({
        acknowledgement: false,
        message: "Not Found",
        description: "جایزه  مورد نظر برای بروزرسانی یافت نشد"
      });
    }

    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "جایزه  با موفقیت بروزرسانی شد",
      data: result
    });
  } catch (error) {
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطایی در بروزرسانی جایزه  رخ داد",
      error: error.message
    });
  }
};

/* 📌 حذف جایزه  */
exports.deletePropAward = async (req, res) => {
  try {
    const propAward = await PropAward.findByIdAndUpdate(
      req.params.id,
      { isDeleted: true },
      { new: true }
    );
    if (!propAward) {
      return res.status(404).json({
        acknowledgement: false,
        message: "Not Found",
        description: "جایزه  مورد نظر برای حذف یافت نشد"
      });
    }

    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "جایزه  با موفقیت حذف شد"
    });
  } catch (error) {
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطایی در حذف جایزه  رخ داد",
      error: error.message
    });
  }
};
