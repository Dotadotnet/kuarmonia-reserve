/* internal imports */
const News = require("../models/news.model");
const remove = require("../utils/remove.util");
const translateFields = require("../utils/translateFields");
const Translation = require("../models/translation.model");
const { generateSlug, generateSeoFields } = require("../utils/seoUtils");
const NewsType = require("../models/newsType.model");
const { flattenDocumentsTranslations } = require("../utils/flattenTranslations");
const defaultDomain = process.env.NEXT_PUBLIC_CLIENT_URL;

exports.addNews = async (req, res) => {
  try {
    const {
      title,
      type,
      summary,
      content,
      tags,
      category,
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

    const news = new News({
      thumbnail,
      tags: JSON.parse(tags),
      categories: JSON.parse(category),
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
    const slug = await generateSlug(title);
    const { metaTitle, metaDescription } = generateSeoFields({
      title,
      summary,
      categoryTitle: await NewsType.findById(type).title
    });
    const canonicalUrl = `${defaultDomain}/news/${slug}`;

    try {
      const translations = await translateFields(
        {
          title,
          summary,
          content,
          slug,
          metaTitle,
          metaDescription,
          canonicalUrl
        },
        {
          stringFields: [
            "title",
            "summary",
            "slug",
            "metaTitle",
            "metaDescription",
            "canonicalUrl"
          ],
          longTextFields: ["content"]
        }
      );
      const translationDocs = Object.entries(translations).map(
        ([lang, { fields }]) => ({
          language: lang,
          refModel: "News",
          refId: result._id,
          fields
        })
      );
      const savedTranslations = await Translation.insertMany(translationDocs);

      const translationInfos = savedTranslations.map((t) => ({
        translation: t._id,
        language: t.language
      }));

      await News.findByIdAndUpdate(result._id, {
        $set: { translations: translationInfos }
      });

      res.status(201).json({
        acknowledgement: true,
        message: "Created",
        description: "اخبار با موفقیت ایجاد شد",
        data: result
      });
    } catch (translationError) {
      console.log(translationError.message);
      await News.findByIdAndDelete(result._id);
      return res.status(500).json({
        acknowledgement: false,
        message: "Translation Save Error",
        description: "خطا در ذخیره ترجمه‌ها. خبر حذف شد.",
        error: translationError.message
      });
    }
  } catch (error) {
    console.log("Error during news creation:", error);
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: error.message,
      error: error.message
    });
  }
};

/* 📌 دریافت همه اخبار */
exports.getAllNews = async (req,res) => {
  try {
    const { page = 1, limit = 5, search = "" } = req.query;
    const skip = (page - 1) * limit;
    let matchedCategoryIds = [];

    if (search) {
      const translations = await Translation.find({
        language: req.locale,
        refModel: "News",
        "fields.title": { $regex: search, $options: "i" }
      }).select("refId");

      matchedCategoryIds = translations.map((t) => t.refId);
    }

    const query = {
      isDeleted: false,
      ...(search ? { _id: { $in: matchedCategoryIds } } : {})
    };
    // First, get the news documents with translation IDs only
    const news = await News.find(query)
      .skip(skip)
      .limit(Number(limit))
      .sort({ createdAt: -1 })
      .populate([
        {
          path: "creator",
          select: "name avatar"
        },
        {
          path: "categories",
          select: "icon title _id"
        }
      ]).lean();

    // Then manually fetch translation data for each news item
    const newsWithTranslations = await Promise.all(
      news.map(async (item) => {
        // Find the translation for the requested locale
        const translationInfo = item.translations.find(
          (t) => t.language === req.locale && t.translation
        );
        
        if (translationInfo) {
          // Fetch the full translation document
          const translation = await Translation.findById(translationInfo.translation);
          if (translation) {
            // Add the translation fields directly to the news item
            return {
              ...item,
              ...translation.fields
            };
          }
        }
        
        // If no translation found, return the item as is
        return item;
      })
    );

    const total = await News.countDocuments(query);

    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "لیست اخبار با موفقیت دریافت شد",
      data: newsWithTranslations,
      total
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

exports.getNews = async (req, res) => {
  try {
    const newsId = parseInt(req.params.id, 10);

    // First, get the news document with translation IDs only
    const news = await News.findOne({ newsId }).populate([
      {
        path: "type",
        populate: {
          path: "translations.translation",
          match: { language: req.locale },
          select: "fields.title language"
        },
        select: "fields.title language"
      },
      {
        path: "reviews",
        options: { sort: { updatedAt: -1 } }
      },
      {
        path: "creator",
        populate: {
          path: "translations.translation",
          match: { language: req.locale }
        }
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
    ]).lean();
    
    if (!news) {
      return res.status(404).json({
        acknowledgement: false,
        message: "Not Found",
        description: "اخبار مورد نظر یافت نشد"
      });
    }
    
    // Manually fetch translation data for the news item
    let newsWithTranslation = news;
    
    // Find the translation for the requested locale
    const translationInfo = news.translations.find(
      (t) => t.language === req.locale && t.translation
    );
    
    if (translationInfo && translationInfo.translation) {
      // Fetch the full translation document
      const translation = await Translation.findById(translationInfo.translation);
      if (translation) {
        // Add the translation fields directly to the news item
        newsWithTranslation = {
          ...newsWithTranslation,
          ...translation.fields
        };
      }
    }

    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "اخبار با موفقیت دریافت شد",
      data: newsWithTranslation
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

exports.deleteNews = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);

    if (!news) {
      return res.status(404).json({
        acknowledgement: false,
        message: "Not Found",
        description: "اخبار مورد نظر برای حذف یافت نشد"
      });
    }

    const translationIds = news.translations.map((item) => item.translation);

    await Translation.deleteMany({ _id: { $in: translationIds } });

    await News.findByIdAndDelete(req.params.id);
    await remove("news", news.thumbnail.public_id);

    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "اخبار و ترجمه‌های مرتبط با موفقیت حذف شد"
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




















































