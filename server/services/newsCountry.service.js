/* internal imports */
const NewsCountry = require("../models/newsCountry.model");
const Admin = require("../models/admin.model");
const { translate } = require("google-translate-api-x");
const Translation = require("../models/translation.model");
const {
  generateSlug,
 } = require("../utils/translationUtils");
/* 📌 اضافه کردن کشور خبر جدید */
exports.addNewsCountry = async (req, res) => {
  try {
    const { title, ...otherInformation } = req.body;

    let translatedTitle = "";
    let translatedTitleTr = "";

    try {
      const resultTitleEn = await translate(title, { to: "en", client: "gtx" });
      translatedTitle = resultTitleEn.text;

      const resultTitleTr = await translate(title, { to: "tr", client: "gtx" });
      translatedTitleTr = resultTitleTr.text;
    } catch (err) {
      console.error("خطا در ترجمه:", err);
      return res.status(500).json({
        acknowledgement: false,
        message: "Error",
        description: "خطایی در فرآیند ترجمه رخ داد",
        error: err.message
      });
    }

    const newsCountry = new NewsCountry({
      ...otherInformation,
      title,
      creator: req.admin._id
    });
    const result = await newsCountry.save();

    const translationData = [
      {
        language: "en",
        refModel: "NewsCountry",
        refId: result._id,
        fields: {
          title: translatedTitle
        }
      },
      {
        language: "tr",
        refModel: "NewsCountry",
        refId: result._id,
        fields: {
          title: translatedTitleTr
        }
      }
    ];

    await Translation.insertMany(translationData);

    await Admin.findByIdAndUpdate(result.creator, {
      $set: { newsCountry: result._id }
    });

    res.status(201).json({
      acknowledgement: true,
      message: "Created",
      description: "کشور خبر با موفقیت ایجاد شد",
      data: result
    });
  } catch (error) {
    const errorMessage = error.message.split(":")[2]?.trim();
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: errorMessage,
      error: error.message
    });
  }
};

/* 📌 دریافت همه کشور خبر */
exports.getNewsCountries = async (res) => {
  try {
    const venueAminities = await NewsCountry.find({
      isDeleted: false
    }).populate("creator");
    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "لیست کشور خبر با موفقیت دریافت شد",
      data: venueAminities
    });
  } catch (error) {
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطایی در دریافت کشور خبر رخ داد",
      error: error.message
    });
  }
};

/* 📌 دریافت یک کشور خبر */
exports.getNewsCountry = async (req, res) => {
  
  try {
    const newsCountry = await NewsCountry.findById(req.params.id);

    if (!newsCountry) {
      return res.status(404).json({
        acknowledgement: false,
        message: "Not Found",
        description: "کشور خبر مورد نظر یافت نشد"
      });
    }

    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "کشور خبر با موفقیت دریافت شد",
      data: newsCountry
    });
  } catch (error) {
    console.log(error)
    const errorMessage = error.message.split(":")[2]?.trim();

    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: errorMessage,
      error: error.message
    });
  }
};

/* 📌 بروزرسانی کشور خبر */
exports.updateNewsCountry = async (req, res) => {
  try {
    const updatedNewsCountry = req.body;
    let translatedTitleEn = "";
    let translatedTitleTr = "";
    if (updatedNewsCountry.title) {
      try {
        const resultTitleEn = await translate(updatedNewsCountry.title, { to: "en", client: "gtx" });
        translatedTitleEn = resultTitleEn.text;

        const resultTitleTr = await translate(updatedNewsCountry.title, { to: "tr", client: "gtx" });
        translatedTitleTr = resultTitleTr.text;

        await Translation.updateOne(
          { refModel: "NewsCountry", refId: req.params.id, language: "en" },
          { $set: { "fields.title": translatedTitleEn } }
        );

        await Translation.updateOne(
          { refModel: "NewsCountry", refId: req.params.id, language: "tr" },
          { $set: { "fields.title": translatedTitleTr } }
        );

      } catch (translateErr) {
        console.error("خطا در ترجمه:", translateErr);
        return res.status(500).json({
          acknowledgement: false,
          message: "Error",
          description: "خطایی در فرآیند ترجمه هنگام بروزرسانی رخ داد",
          error: translateErr.message
        });
      }
    }
    if (updatedNewsCountry.title) {
      updatedNewsCountry.slug = await generateSlug(updatedNewsCountry.title);
    }
    const result = await NewsCountry.findByIdAndUpdate(
      req.params.id,
      updatedNewsCountry,
      { new: true, runValidators: true }
    );

    if (!result) {
      return res.status(404).json({
        acknowledgement: false,
        message: "Not Found",
        description: "کشور خبر مورد نظر برای بروزرسانی یافت نشد"
      });
    }

    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "کشور خبر با موفقیت بروزرسانی شد",
      data: result
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطایی در بروزرسانی کشور خبر رخ داد",
      error: error.message
    });
  }
};

/* 📌 حذف کشور خبر */
exports.deleteNewsCountry = async (req, res) => {
  try {
    const newsCountry = await NewsCountry.findByIdAndUpdate(
      req.params.id,
      { isDeleted: true },
      { new: true }
    );
    if (!newsCountry) {
      return res.status(404).json({
        acknowledgement: false,
        message: "Not Found",
        description: "کشور خبر مورد نظر برای حذف یافت نشد"
      });
    }

    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "کشور خبر با موفقیت حذف شد"
    });
  } catch (error) {
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطایی در حذف کشور خبر رخ داد",
      error: error.message
    });
  }
};
