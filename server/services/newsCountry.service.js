/* internal imports */
const NewsCountry = require("../models/newsCountry.model");
const Admin = require("../models/admin.model");
const { translate } = require("google-translate-api-x");
const Translation = require("../models/translation.model");
const translateFields = require("../utils/translateFields");
const { generateSlug } = require("../utils/seoUtils");
exports.addNewsCountry = async (req, res) => {
  try {
    const { title, ...otherInformation } = req.body;
    console.log(req.body)
    const newsCountry = new NewsCountry({
      ...otherInformation,
      creator: req.admin._id
    });

    const result = await newsCountry.save();
    const slug = await generateSlug(title);
    try {
      const translations = await translateFields(
        {
          title,
          slug
        },
        {
          stringFields: ["title", "slug"]
        }
      );
      const translationDocs = Object.entries(translations).map(
        ([lang, { fields }]) => ({
          language: lang,
          refModel: "NewsCountry",
          refId: result._id,
          fields
        })
      );
      const savedTranslations = await Translation.insertMany(translationDocs);
      const translationInfos = savedTranslations.map((t) => ({
        translation: t._id,
        language: t.language
      }));
      await NewsCountry.findByIdAndUpdate(result._id, {
        $set: { translations: translationInfos }
      });
      res.status(201).json({
        acknowledgement: true,
        message: "Created",
        description: "اخبار با موفقیت ایجاد شد",
        data: result
      });
    } catch (translationError) {
      await NewsCountry.findByIdAndDelete(result._id);
      console.log(translationError.message);
      return res.status(500).json({
        acknowledgement: false,
        message: "Translation Save Error",
        description: "خطا در ذخیره ترجمه‌ها. کشور خبر حذف شد.",
        error: translationError.message
      });
    }
  } catch (error) {
    console.log(error.message)
    const errorMessage = error.message.split(":")[2]?.trim();
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: error.message,
      error: error.message
    });
  }
};

/* 📌 دریافت همه کشور خبر */
exports.getNewsCountries = async (res,req) => {
  try {
    console.log(req)
    const countries = await NewsCountry.find({
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
    ])
    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "لیست کشور خبر با موفقیت دریافت شد",
      data: countries
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
    console.log(error);
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
        const resultTitleEn = await translate(updatedNewsCountry.title, {
          to: "en",
          client: "gtx"
        });
        translatedTitleEn = resultTitleEn.text;

        const resultTitleTr = await translate(updatedNewsCountry.title, {
          to: "tr",
          client: "gtx"
        });
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
    console.log(error);
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
