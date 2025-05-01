/* internal imports */
const NewsType = require("../models/newsType.model");
const { translate } = require("google-translate-api-x");
const Translation = require("../models/translation.model");
const { generateSlug } = require("../utils/seoUtils");
const translateFields = require("../utils/translateFields");

/* 📌 اضافه کردن نوع خبر جدید */
exports.addNewsType = async (req, res) => {
  try {
    const { title, description, icon } = req.body;

    const newsType = new NewsType({
      title,
      description,
      icon,
      creator: req.admin._id
    });
    const result = await newsType.save();
    const slug = await generateSlug(title);

    try {
      const translations = await translateFields(
        {
          title,
          description,
          slug
        },
        {
          stringFields: ["title", "description","slug"]
        }
      );
      const translationDocs = Object.entries(translations).map(
        ([lang, { fields }]) => ({
          language: lang,
          refModel: "NewsType",
          refId: result._id,
          fields
        })
      );
      const savedTranslations = await Translation.insertMany(translationDocs);
      const translationInfos = savedTranslations.map((t) => ({
        translation: t._id,
        language: t.language
      }));
      await NewsType.findByIdAndUpdate(result._id, {
        $set: { translations: translationInfos }
      });
      res.status(201).json({
        acknowledgement: true,
        message: "Created",
        description: "نوع خبر با موفقیت ایجاد شد",
        data: result
      });
    } catch (translationError) {
      await NewsType.findByIdAndDelete(result._id);
      return res.status(500).json({
        acknowledgement: false,
        message: "Translation Save Error",
        description: "خطا در ذخیره ترجمه‌ها. نوع خبر حذف شد.",
        error: translationError.message
      });
    }
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

/* 📌 دریافت همه نوع خبر */
exports.getNewsTypes = async (req,res) => {
  try {
    const newsType = await NewsType.find({ isDeleted: false }).populate([
      {
        path: "translations.translation",
        match: { language: req.locale }
      },
      {
        path: "creator",
        select: "name avatar"
      }
    ]);
    console.log(req.locale)
    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "لیست نوع خبر با موفقیت دریافت شد",
      data: newsType
    });
  } catch (error) {
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطایی در دریافت نوع خبر رخ داد",
      error: error.message
    });
  }
};

/* 📌 دریافت یک نوع خبر */
exports.getNewsType = async (req, res) => {
  try {
    const newsType = await NewsType.findById(req.params.id);

    if (!newsType) {
      return res.status(404).json({
        acknowledgement: false,
        message: "Not Found",
        description: "نوع خبر مورد نظر یافت نشد"
      });
    }

    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "نوع خبر با موفقیت دریافت شد",
      data: newsType
    });
  } catch (error) {
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطایی در دریافت نوع خبر رخ داد",
      error: error.message
    });
  }
};

/* 📌 بروزرسانی نوع خبر */
exports.updateNewsType = async (req, res) => {
  try {
    const updatedNewsType = req.body;

    let translatedTitleEn = "";
    let translatedTitleTr = "";
    let translatedDescriptionEn = "";
    let translatedDescriptionTr = "";

    if (updatedNewsType.title || updatedNewsType.description) {
      try {
        if (updatedNewsType.title) {
          const resultTitleEn = await translate(updatedNewsType.title, {
            to: "en",
            client: "gtx"
          });
          translatedTitleEn = resultTitleEn.text;

          const resultTitleTr = await translate(updatedNewsType.title, {
            to: "tr",
            client: "gtx"
          });
          translatedTitleTr = resultTitleTr.text;
        }

        if (updatedNewsType.description) {
          const resultDescriptionEn = await translate(
            updatedNewsType.description,
            {
              to: "en",
              client: "gtx"
            }
          );
          translatedDescriptionEn = resultDescriptionEn.text;

          const resultDescriptionTr = await translate(
            updatedNewsType.description,
            {
              to: "tr",
              client: "gtx"
            }
          );
          translatedDescriptionTr = resultDescriptionTr.text;
        }

        await Translation.updateOne(
          { refModel: "NewsType", refId: req.params.id, language: "en" },
          {
            $set: {
              ...(translatedTitleEn && { "fields.title": translatedTitleEn }),
              ...(translatedDescriptionEn && {
                "fields.description": translatedDescriptionEn
              })
            }
          },
          { upsert: true }
        );

        await Translation.updateOne(
          { refModel: "NewsType", refId: req.params.id, language: "tr" },
          {
            $set: {
              ...(translatedTitleTr && { "fields.title": translatedTitleTr }),
              ...(translatedDescriptionTr && {
                "fields.description": translatedDescriptionTr
              })
            }
          },
          { upsert: true }
        );
      } catch (translateErr) {
        console.error("❌ خطا در ترجمه:", translateErr.message);
        return res.status(404).json({
          acknowledgement: false,
          message: "ترجمه نشد",
          description: "خطا در  فرآیند ترجمه"
        });
      }
    }
    if (updatedNewsType.title) {
      updatedNewsType.slug = await generateSlug(updatedNewsType.title);
    }
    const result = await NewsType.findByIdAndUpdate(
      req.params.id,
      updatedNewsType,
      { new: true }
    );

    if (!result) {
      return res.status(404).json({
        acknowledgement: false,
        message: "Not Found",
        description: "نوع خبر مورد نظر یافت نشد"
      });
    }

    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "نوع خبر با موفقیت دریافت و بروزرسانی شد",
      data: result
    });
  } catch (error) {
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطایی در دریافت یا بروزرسانی نوع خبر رخ داد",
      error: error.message
    });
  }
};

/* 📌 حذف نوع خبر */
exports.deleteNewsType = async (req, res) => {
  try {
    const newsType = await NewsType.findByIdAndUpdate(
      req.params.id,
      { isDeleted: true },
      { new: true }
    );
    if (!newsType) {
      return res.status(404).json({
        acknowledgement: false,
        message: "Not Found",
        description: "نوع خبر مورد نظر برای حذف یافت نشد"
      });
    }

    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "نوع خبر با موفقیت حذف شد"
    });
  } catch (error) {
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطایی در حذف نوع خبر رخ داد",
      error: error.message
    });
  }
};
