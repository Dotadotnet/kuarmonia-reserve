/* internal imports */
const News = require("../models/news.model");
const Product = require("../models/product.model");
const Admin = require("../models/admin.model");
const remove = require("../utils/remove.util");
const { translate } = require("google-translate-api-x");
const Translation = require("../models/translation.model");
/* 📌 اضافه کردن اخبار جدید */
exports.addNews = async (req, res) => {
  try {
    const {
      title,
      type,
      summary,
      tags,
      category,
      content,
      publishDate,
      socialLinks,
      visibility,
      readTime,
      source,
      country
    } = req.body;
    let thumbnail = null;
    if (req.uploadedFiles["thumbnail"].length) {
      thumbnail = {
        url: req.uploadedFiles["thumbnail"][0].url,
        public_id: req.uploadedFiles["thumbnail"][0].key
      };
    }

    let translatedTitle = "";
    let translatedSummary = "";
    let translatedContent = "";
    let translatedTitleTr = "";
    let translatedSummaryTr = "";
    let translatedContentTr = "";

    console.log("Starting translation process...");

    try {
      console.log("Translating title to English...");
      const resultTitleEn = await translate(title, { to: "en", client: "gtx" });
      translatedTitle = resultTitleEn.text;
      console.log("Translated Title (EN):", translatedTitle);

      console.log("Translating summary to English...");
      const resultSummaryEn = await translate(summary, {
        to: "en",
        client: "gtx"
      });
      translatedSummary = resultSummaryEn.text;
      console.log("Translated Summary (EN):", translatedSummary);

      console.log("Translating content to English...");
      const resultContentEn = await translate(content, {
        to: "en",
        client: "gtx"
      });
      translatedContent = resultContentEn.text;
      console.log("Translated Content (EN):", translatedContent);

      console.log("Translating title to Turkish...");
      const resultTitleTr = await translate(title, { to: "tr", client: "gtx" });
      translatedTitleTr = resultTitleTr.text;
      console.log("Translated Title (TR):", translatedTitleTr);

      console.log("Translating summary to Turkish...");
      const resultSummaryTr = await translate(summary, {
        to: "tr",
        client: "gtx"
      });
      translatedSummaryTr = resultSummaryTr.text;
      console.log("Translated Summary (TR):", translatedSummaryTr);

      console.log("Translating content to Turkish...");
      const resultContentTr = await translate(content, {
        to: "tr",
        client: "gtx"
      });
      translatedContentTr = resultContentTr.text;
      console.log("Translated Content (TR):", translatedContentTr);
    } catch (err) {
      console.error("خطا در ترجمه:", err);
      return res.status(500).json({
        acknowledgement: false,
        message: "Error",
        description: "خطایی در فرآیند ترجمه رخ داد",
        error: err.message
      });
    }

    const news = new News({
      title,
      summary,
      thumbnail,
      tags: JSON.parse(tags),
      categories: JSON.parse(category),
      content,
      type,
      country,
      publishDate,
      socialLinks: JSON.parse(socialLinks),
      visibility: visibility ? "public" : "private",
      readTime,
      source: JSON.parse(source),
      creator: req.admin._id
    });

    const result = await news.save();
    const { metaTitle, metaDescription } = result;

    const [translatedMetaTitleEn, translatedMetaDescriptionEn] =
      await Promise.all([
        translate(metaTitle, { to: "en", client: "gtx" }),
        translate(metaDescription, { to: "en", client: "gtx" })
      ]);

    const [translatedMetaTitleTr, translatedMetaDescriptionTr] =
      await Promise.all([
        translate(metaTitle, { to: "tr", client: "gtx" }),
        translate(metaDescription, { to: "tr", client: "gtx" })
      ]);
    const translationData = [
      {
        language: "en",
        refModel: "News",
        refId: result._id,
        fields: {
          title: translatedTitle,
          summary: translatedSummary,
          content: translatedContent,
          metaTitle: translatedMetaTitleEn.text,
          metaDescription: translatedMetaDescriptionEn.text
        }
      },
      {
        language: "tr",
        refModel: "News",
        refId: result._id,
        fields: {
          title: translatedTitleTr,
          summary: translatedSummaryTr,
          content: translatedContentTr,
          metaTitle: translatedMetaTitleTr.text,
          metaDescription: translatedMetaDescriptionTr.text
        }
      }
    ];

    await Translation.insertMany(translationData);

    await Admin.findByIdAndUpdate(result.creator, {
      $set: { news: result._id }
    });

    res.status(201).json({
      acknowledgement: true,
      message: "Created",
      description: "اخبار با موفقیت ایجاد شد",
      data: result
    });
  } catch (error) {
    console.log("Error during news creation:", error);
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطایی در ثبت اخبار رخ داد",
      error: error.message
    });
  }
};

/* 📌 دریافت همه اخبار */
exports.getAllNews = async (res) => {
  try {
    const news = await News.find().populate([
      {
        path: "categories",
        select: "title _id icon"
      }
    ]);
    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "لیست اخبار با موفقیت دریافت شد",
      data: news
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطایی در دریافت اخبار رخ داد",
      error: error.message
    });
  }
};

/* 📌 دریافت یک اخبار */
exports.getNews = async (req, res) => {
  try {
    const news = await News.findById(req.params.id).populate([
      {
        path: "creator",
        select: "name avatar"
      },
      {
        path: "tags",
        select: "title _id keynotes"
      },
      {
        path: "categories",
        select: "title _id icon"
      },
      {
        path: "socialLinks.network",
        select: "title platform icon"
      }
    ]);
    if (!news) {
      return res.status(404).json({
        acknowledgement: false,
        message: "Not Found",
        description: "اخبار مورد نظر یافت نشد"
      });
    }
    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "اخبار با موفقیت دریافت شد",
      data: news
    });
  } catch (error) {
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطایی در دریافت اخبار رخ داد",
      error: error.message
    });
  }
};

/* 📌 بروزرسانی اخبار */
exports.updateNews = async (req, res) => {
  try {
    const updatedNews = req.body;
    console.log("Updated News:", updatedNews);
    console.log("News ID:", req.params.id);

    const result = await News.findByIdAndUpdate(req.params.id, updatedNews, {
      new: true
    });

    if (!result) {
      return res.status(404).json({
        acknowledgement: false,
        message: "Not Found",
        description: "اخبار مورد نظر برای بروزرسانی یافت نشد"
      });
    }

    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "اخبار با موفقیت بروزرسانی شد",
      data: result
    });
  } catch (error) {
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطایی در بروزرسانی اخبار رخ داد",
      error: error.message
    });
  }
};

/* 📌 حذف اخبار */
exports.deleteNews = async (req, res) => {
  try {
    const news = await News.findByIdAndDelete(req.params.id);

    if (!news) {
      return res.status(404).json({
        acknowledgement: false,
        message: "Not Found",
        description: "اخبار مورد نظر برای حذف یافت نشد"
      });
    }

    await remove(news.logo?.public_id);

    await Product.updateMany({ news: req.params.id }, { $unset: { news: "" } });
    await Admin.findByIdAndUpdate(news.creator, {
      $unset: { news: "" }
    });

    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "اخبار با موفقیت حذف شد"
    });
  } catch (error) {
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطایی در حذف اخبار رخ داد",
      error: error.message
    });
  }
};
