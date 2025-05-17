/* internal imports */
const Standard = require("../models/standard.model");
const Translation = require("../models/translation.model");
const translateFields = require("../utils/translateFields");

/* 📌 اضافه کردن استاندارد جدید */
exports.addStandard = async (req, res) => {
  try {
    const { title, description, country, issuingOrganization, ...otherInfo } =
      req.body;

    let thumbnail = null;
    if (req.uploadedFiles["thumbnail"]?.length) {
      thumbnail = {
        url: req.uploadedFiles["thumbnail"][0].url,
        public_id: req.uploadedFiles["thumbnail"][0].key
      };
    }

    const standard = new Standard({
      ...otherInfo,
      thumbnail,
      creator: req.admin._id
    });
    const result = await standard.save();

    try {
      const translations = await translateFields(
        {
          title,
          description,
          issuingOrganization,
          country
        },
        {
          stringFields: [
            "title",
            "description",
            "issuingOrganization",
            "country"
          ]
        }
      );

      const translationDocs = Object.entries(translations).map(
        ([lang, { fields }]) => ({
          language: lang,
          refModel: "Standard",
          refId: result._id,
          fields
        })
      );
      const savedTranslations = await Translation.insertMany(translationDocs);
      const translationInfos = savedTranslations.map((t) => ({
        translation: t._id,
        language: t.language
      }));
      await Standard.findByIdAndUpdate(result._id, {
        $set: { translations: translationInfos }
      });
    } catch (translationError) {
      await Standard.findByIdAndDelete(result._id);
      return res.status(500).json({
        acknowledgement: false,
        message: "Translation Save Error",
        description: "خطا در ذخیره ترجمه‌ها. استاندارد  حذف شد.",
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
      description: error.message,
      error: error.message
    });
  }
};

/* 📌 دریافت همه استانداردها */
exports.getStandards = async (req, res) => {
  try {
    const propAminities = await Standard.find({
      isDeleted: false
    }).populate([
      {
        path: "translations.translation",
        match: { language: req.locale }
      },
      {
        path: "creator",
        select: "name avatar"
      }
    ]);
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
exports.getstandard = async (req, res) => {
  try {
    const standard = await Standard.findById(req.params.id);

    if (!standard) {
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
      data: standard
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
exports.updateStandard = async (req, res) => {
  try {
    const updatedStandard = req.body;

    const result = await Standard.findByIdAndUpdate(
      req.params.id,
      updatedstandard,
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
exports.deleteStandard = async (req, res) => {
  try {
    const standard = await Standard.findByIdAndUpdate(
      req.params.id,
      { isDeleted: true },
      { new: true }
    );

    if (!standard) {
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
