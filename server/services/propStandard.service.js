/* internal imports */
const PropStandard = require("../models/propStandard.model");
const Translation = require("../models/translation.model");
const translateFields = require("../utils/translateFields");

/* 📌 اضافه کردن استاندارد جدید */
exports.addPropStandard = async (req, res) => {
  try {
    const { title, description,country,issuingOrganization, ...otherInfo } = req.body;
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
    let thumbnail = null;
    if (req.uploadedFiles["thumbnail"]?.length) {
      thumbnail = {
        url: req.uploadedFiles["thumbnail"][0].url,
        public_id: req.uploadedFiles["thumbnail"][0].key
      };
    }

    const propStandard = new PropStandard({
      ...otherInfo,
      title,
      description,
      country,
      issuingOrganization,
      thumbnail,
      creator: req.admin._id
    });
    const result = await propStandard.save();
    const translationDocs = Object.entries(translations).map(
      ([lang, { fields }]) => ({
        language: lang,
        refModel: "PropStandard",
        refId: result._id,
        fields
      })
    );

    try {
      await Translation.insertMany(translationDocs);
    } catch (translationError) {
      await PropStandard.findByIdAndDelete(result._id);
      return res.status(500).json({
        acknowledgement: false,
        message: "Translation Save Error",
        description: "خطا در ذخیره ترجمه‌ها.  استاندارد حذف شد.",
        error: translationError.message
      });
    }
    res.status(201).json({
      acknowledgement: true,
      message: "Created",
      description: "استاندارد با موفقیت ایجاد شد",
      data: result
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطایی در ثبت  رخ داد",
      error: error.message
    });
  }
};

/* 📌 دریافت همه استانداردها */
exports.getPropStandards = async (res) => {
  try {
    const propAminities = await PropStandard.find({
      isDeleted: false
    }).populate("creator");
    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "لیست استانداردها با موفقیت دریافت شد",
      data: propAminities
    });
  } catch (error) {
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطایی در دریافت استانداردها رخ داد",
      error: error.message
    });
  }
};

/* 📌 دریافت یک استاندارد */
exports.getPropStandard = async (req, res) => {
  try {
    const propStandard = await PropStandard.findById(req.params.id);

    if (!propStandard) {
      return res.status(404).json({
        acknowledgement: false,
        message: "Not Found",
        description: "استاندارد مورد نظر یافت نشد"
      });
    }

    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "استاندارد با موفقیت دریافت شد",
      data: propStandard
    });
  } catch (error) {
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطایی در دریافت استاندارد رخ داد",
      error: error.message
    });
  }
};

/* 📌 بروزرسانی استاندارد */
exports.updatePropStandard = async (req, res) => {
  try {
    const updatedPropStandard = req.body;
    console.log("Updated PropStandard:", updatedPropStandard);
    console.log("PropStandard ID:", req.params.id);

    const result = await PropStandard.findByIdAndUpdate(
      req.params.id,
      updatedPropStandard,
      {
        new: true
      }
    );

    if (!result) {
      return res.status(404).json({
        acknowledgement: false,
        message: "Not Found",
        description: "استاندارد مورد نظر برای بروزرسانی یافت نشد"
      });
    }

    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "استاندارد با موفقیت بروزرسانی شد",
      data: result
    });
  } catch (error) {
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطایی در بروزرسانی استاندارد رخ داد",
      error: error.message
    });
  }
};

/* 📌 حذف استاندارد */
exports.deletePropStandard = async (req, res) => {
  try {
    const propStandard = await PropStandard.findByIdAndUpdate(
      req.params.id,
      { isDeleted: true },
      { new: true }
    );

    if (!propStandard) {
      return res.status(404).json({
        acknowledgement: false,
        message: "Not Found",
        description: "استاندارد مورد نظر برای حذف یافت نشد"
      });
    }

    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "استاندارد با موفقیت حذف شد"
    });
  } catch (error) {
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطایی در حذف استاندارد رخ داد",
      error: error.message
    });
  }
};
