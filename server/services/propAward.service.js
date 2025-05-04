/* internal imports */
const PropAward = require("../models/propAward.model");
const Translation = require("../models/translation.model");
const translateFields = require("../utils/translateFields");


exports.addPropAward = async (req, res) => {
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
    const propAward = new PropAward({
      ...otherInfo,
      thumbnail,
      creator: req.admin._id
    });

    const result = await propAward.save();

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
          refModel: "PropAward",
          refId: result._id,
          fields
        })
      );
      const savedTranslations = await Translation.insertMany(translationDocs);
      const translationInfos = savedTranslations.map((t) => ({
        translation: t._id,
        language: t.language
      }));
      await PropAward.findByIdAndUpdate(result._id, {
        $set: { translations: translationInfos }
      });
    } catch (translationError) {
      await PropAward.findByIdAndDelete(result._id);
      return res.status(500).json({
        acknowledgement: false,
        message: "Translation Save Error",
        description: "خطا در ذخیره ترجمه‌ها. پست بلاگ حذف شد.",
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
    console.log(error.message);
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: error.message,
      error: error.message
    });
  }
};

/* 📌 دریافت همه جایزه ها */
exports.getPropAwards = async (req,res) => {
  try {
    const propAwards = await PropAward.find({ isDeleted: false }).populate([
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
