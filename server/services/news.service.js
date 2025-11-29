/* internal imports */
const News = require("../models/news.model");
const remove = require("../utils/remove.util");
const translateFields = require("../utils/translateFields");
const { generateSlug } = require("../utils/seoUtils");
const NewsType = require("../models/newsType.model");
const defaultDomain = process.env.NEXT_PUBLIC_CLIENT_URL;

exports.addNews = async (req, res) => {
  try {
    const {
      title,
      type,
      description, // Changed from summary to description
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
    
    // === Validation اولیه ===
    if (!title) return res.status(400).json({ acknowledgement: false, description: "عنوان فارسی الزامی است" });
    if (!description) return res.status(400).json({ acknowledgement: false, description: "توضیحات فارسی الزامی است" }); // Changed from summary to description
    
    let thumbnail = null;
    if (req.uploadedFiles["thumbnail"].length) {
      thumbnail = {
        url: req.uploadedFiles["thumbnail"][0].url,
        public_id: req.uploadedFiles["thumbnail"][0].key
      };
    }

    // === آماده‌سازی داده برای ترجمه ===
    const dataForTranslation = {
      title,
      summary: description, // Changed from summary to description
      content: content || ""
    };

    // === ترجمه قبل از ذخیره ===
    const translations = await translateFields(dataForTranslation, {
      stringFields: ["title", "summary"], // Changed from summary to description in field mapping
      longTextFields: ["content"]
    });

    const en = translations.en?.fields || {};
    const tr = translations.tr?.fields || {};

    // === ساخت خبر کامل ===
    const news = new News({
      title: {
        fa: title,
        en: en.title || title,
        tr: tr.title || title
      },
      summary: {
        fa: description, // Changed from summary to description
        en: en.summary || description, // Changed from summary to description
        tr: tr.summary || description // Changed from summary to description
      },
      content: {
        fa: content || "",
        en: en.content || content || "",
        tr: tr.content || content || ""
      },
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
      creator: req.admin._id,
      slug: { fa: "", en: "", tr: "" }
    });

    // === ذخیره اولیه ===
    const result = await news.save();

    // === تولید slug ===
    result.slug = {
      fa: await generateSlug(title),
      en: await generateSlug(en.title || title),
      tr: await generateSlug(tr.title || title)
    };

    result.markModified('slug');
    await result.save();

    res.status(201).json({
      acknowledgement: true,
      message: "Created",
      description: "اخبار با موفقیت ایجاد و ترجمه شد",
      data: result
    });
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
    const locale = req.locale || "fa";

    const matchStage = {
      isDeleted: false,
    };

    // Add search functionality
    if (search) {
      matchStage.$or = [
        { [`title.${locale}`]: { $regex: search, $options: "i" } },
        { [`summary.${locale}`]: { $regex: search, $options: "i" } }
      ];
    }

    const pipeline = [
      { $match: matchStage },
      { $skip: Number(skip) },
      { $limit: Number(limit) },
      { $sort: { createdAt: -1 } },

      // Populate creator with only necessary fields
      {
        $lookup: {
          from: "admins",
          localField: "creator",
          foreignField: "_id",
          as: "creator",
        },
      },
      { $unwind: { path: "$creator", preserveNullAndEmptyArrays: true } },

      // Populate type
      {
        $lookup: {
          from: "newstypes",
          localField: "type",
          foreignField: "_id",
          as: "type",
        },
      },
      { $unwind: { path: "$type", preserveNullAndEmptyArrays: true } },

      // Populate categories
      {
        $lookup: {
          from: "categories",
          localField: "categories",
          foreignField: "_id",
          as: "categories",
        },
      },

      // Select final fields with localization
      {
        $project: {
          newsId: 1,
          thumbnail: 1,
          status: 1,
          views: 1,
          createdAt: 1,
          title: `$title.${locale}`,
          summary: `$summary.${locale}`, // This stays as summary in the model
          slug: `$slug.${locale}`,
          canonicalUrl: `$canonicalUrl.${locale}`,
          "creator._id": 1,
          "creator.name": 1,
          "creator.avatar": 1,
          "type._id": 1,
          "type.title": `$type.title.${locale}`,
          "type.icon": 1,
          categoriesCount: { $size: "$categories" }
        },
      },
    ];

    const news = await News.aggregate(pipeline);
    const total = await News.countDocuments(matchStage);

    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "لیست اخبار با موفقیت دریافت شد",
      data: news,
      total,
      page: Number(page),
      limit: Number(limit),
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
    const locale = req.locale || "fa";

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        acknowledgement: false,
        message: "Bad Request",
        description: "شناسه نامعتبر است"
      });
    }

    const objectId = new mongoose.Types.ObjectId(id);

    const pipeline = [
      { $match: { _id: objectId, isDeleted: false } },
      
      // Populate type
      {
        $lookup: {
          from: "newstypes",
          localField: "type",
          foreignField: "_id",
          as: "type",
        },
      },
      { $unwind: { path: "$type", preserveNullAndEmptyArrays: true } },

      // Populate reviews
      {
        $lookup: {
          from: "reviews",
          localField: "reviews",
          foreignField: "_id",
          as: "reviews",
          pipeline: [
            { $sort: { updatedAt: -1 } },
            {
              $lookup: {
                from: "admins",
                localField: "creator",
                foreignField: "_id",
                as: "creator",
              },
            },
            { $unwind: { path: "$creator", preserveNullAndEmptyArrays: true } },
          ],
        },
      },

      // Populate creator
      {
        $lookup: {
          from: "admins",
          localField: "creator",
          foreignField: "_id",
          as: "creator",
        },
      },
      { $unwind: { path: "$creator", preserveNullAndEmptyArrays: true } },

      // Populate tags
      {
        $lookup: {
          from: "tags",
          localField: "tags",
          foreignField: "_id",
          as: "tags",
        },
      },

      // Populate categories
      {
        $lookup: {
          from: "categories",
          localField: "categories",
          foreignField: "_id",
          as: "categories",
        },
      },

      // Populate social links
      {
        $lookup: {
          from: "sociallinks",
          localField: "socialLinks.network",
          foreignField: "_id",
          as: "socialNetworks",
        },
      },

      // Select final fields with localization
      {
        $project: {
          newsId: 1,
          thumbnail: 1,
          status: 1,
          views: 1,
          createdAt: 1,
          title: `$title.${locale}`,
          summary: `$summary.${locale}`, // This stays as summary in the model
          content: `$content.${locale}`,
          slug: `$slug.${locale}`,
          canonicalUrl: `$canonicalUrl.${locale}`,
          "creator._id": 1,
          "creator.name": 1,
          "creator.avatar": 1,
          "type._id": 1,
          "type.title": `$type.title.${locale}`,
          "type.icon": 1,
          tags: 1,
          categories: 1,
          socialLinks: 1,
          socialNetworks: 1,
          reviews: 1
        },
      },
    ];

    const news = await News.aggregate(pipeline);

    if (!news || news.length === 0) {
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
      data: news[0]
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
    const {
      title,
      type,
      description, // Changed from summary to description
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
    
    // Prepare update data
    const updateData = {};
    
    // Handle title, description, and content updates
    if (title !== undefined || description !== undefined || content !== undefined) { // Changed from summary to description
      // Validate required fields
      if (title !== undefined && (title === null || title.trim() === "")) {
        return res.status(400).json({
          acknowledgement: false,
          message: "Error",
          description: "عنوان فارسی نمی‌تواند خالی باشد"
        });
      }
      
      if (description !== undefined && (description === null || description.trim() === "")) { // Changed from summary to description
        return res.status(400).json({
          acknowledgement: false,
          message: "Error",
          description: "توضیحات فارسی نمی‌تواند خالی باشد" // Changed from summary to description
        });
      }
      
      // === آماده‌سازی داده برای ترجمه ===
      const dataForTranslation = {};
      if (title !== undefined) dataForTranslation.title = title;
      if (description !== undefined) dataForTranslation.summary = description; // Changed from summary to description
      if (content !== undefined) dataForTranslation.content = content || "";

      // === ترجمه قبل از ذخیره ===
      const translationFields = {};
      if (title !== undefined || description !== undefined) { // Changed from summary to description
        translationFields.stringFields = [];
        if (title !== undefined) translationFields.stringFields.push("title");
        if (description !== undefined) translationFields.stringFields.push("summary"); // Changed from summary to description
      }
      if (content !== undefined) {
        translationFields.longTextFields = ["content"];
      }

      const translations = await translateFields(dataForTranslation, translationFields);

      const en = translations.en?.fields || {};
      const tr = translations.tr?.fields || {};

      if (title !== undefined) {
        updateData.title = {
          fa: title,
          en: en.title || title,
          tr: tr.title || title
        };
      }
      
      if (description !== undefined) { // Changed from summary to description
        updateData.summary = { // This stays as summary in the model
          fa: description, // Changed from summary to description
          en: en.summary || description, // Changed from summary to description
          tr: tr.summary || description // Changed from summary to description
        };
      }
      
      if (content !== undefined) {
        updateData.content = {
          fa: content || "",
          en: en.content || content || "",
          tr: tr.content || content || ""
        };
      }
    }

    if (tags !== undefined) {
      updateData.tags = JSON.parse(tags);
    }

    if (category !== undefined) {
      updateData.categories = JSON.parse(category);
    }

    if (type !== undefined) {
      updateData.type = type;
    }

    if (country !== undefined) {
      updateData.country = country;
    }

    if (publishDate !== undefined) {
      updateData.publishDate = publishDate;
    }

    if (socialLinks !== undefined) {
      updateData.socialLinks = JSON.parse(socialLinks);
    }

    if (visibility !== undefined) {
      updateData.visibility = visibility ? "public" : "private";
    }

    if (readTime !== undefined) {
      updateData.readTime = readTime;
    }

    if (source !== undefined) {
      updateData.source = JSON.parse(source);
    }

    let thumbnail = null;
    if (req.uploadedFiles["thumbnail"] && req.uploadedFiles["thumbnail"].length) {
      thumbnail = {
        url: req.uploadedFiles["thumbnail"][0].url,
        public_id: req.uploadedFiles["thumbnail"][0].key
      };
      updateData.thumbnail = thumbnail;
    }

    // === بروزرسانی اولیه ===
    const result = await News.findByIdAndUpdate(req.params.id, updateData, {
      new: true
    });

    if (!result) {
      return res.status(404).json({
        acknowledgement: false,
        message: "Not Found",
        description: "اخبار مورد نظر برای بروزرسانی یافت نشد"
      });
    }

    // === تولید slug ===
    if (title !== undefined) {
      result.slug = {
        fa: await generateSlug(title),
        en: await generateSlug(en.title || title),
        tr: await generateSlug(tr.title || title)
      };

      result.markModified('slug');
      await result.save();
    }

    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "اخبار با موفقیت بروزرسانی و ترجمه شد",
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

    await News.findByIdAndDelete(req.params.id);
    await remove("news", news.thumbnail.public_id);

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
