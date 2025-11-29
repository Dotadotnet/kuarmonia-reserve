/* internal imports */
const NewsType = require("../models/newsType.model");
const { translate } = require("google-translate-api-x");
const Translation = require("../models/translation.model");
const { generateSlug } = require("../utils/seoUtils");
const translateFields = require("../utils/translateFields");

/* 📌 اضافه کردن نوع خبر جدید */
exports.addNewsType = async (req, res) => {
  try {
    const { title, description, icon } = req.body; // Changed from summary to description
    
    // === Validation اولیه ===
    if (!title) return res.status(400).json({ acknowledgement: false, description: "عنوان فارسی الزامی است" });
    if (!description) return res.status(400).json({ acknowledgement: false, description: "توضیحات فارسی الزامی است" }); // Changed from summary to description
    
    // === آماده‌سازی داده برای ترجمه ===
    const dataForTranslation = {
      title,
      summary: description // Changed from summary to description
    };

    // === ترجمه قبل از ذخیره ===
    const translations = await translateFields(dataForTranslation, {
      stringFields: ["title", "summary"] // This stays as summary for the translation API
    });

    const en = translations.en?.fields || {};
    const tr = translations.tr?.fields || {};
    const ar = translations.ar?.fields || {};

    const newsType = new NewsType({
      title: {
        fa: title,
        en: en.title || title,
        tr: tr.title || title,
        ar: ar.title || title
      },
      summary: {
        fa: description, // Changed from summary to description
        en: en.summary || description, // Changed from summary to description
        tr: tr.summary || description, // Changed from summary to description
        ar: ar.summary || description // Changed from summary to description
      },
      icon,
      creator: req.admin._id
    });
    
    const result = await newsType.save();
    
    res.status(201).json({
      acknowledgement: true,
      message: "Created",
      description: "نوع خبر با موفقیت ایجاد و ترجمه شد",
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

/* 📌 دریافت همه نوع خبر */
exports.getNewsTypes = async (req,res) => {
  try {
    const locale = req.locale || "fa";
    
    const pipeline = [
      { $match: { isDeleted: false } },
      
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

      // Select final fields with localization
      {
        $project: {
          icon: 1,
          status: 1,
          createdAt: 1,
          title: `$title.${locale}`,
          summary: `$summary.${locale}`,
          "creator._id": 1,
          "creator.name": 1,
          "creator.avatar": 1,
        },
      },
    ];

    const newsTypes = await NewsType.aggregate(pipeline);
    
    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "لیست نوع خبر با موفقیت دریافت شد",
      data: newsTypes
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
    const locale = req.locale || "fa";
    
    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        acknowledgement: false,
        message: "Bad Request",
        description: "شناسه نامعتبر است"
      });
    }

    const objectId = new mongoose.Types.ObjectId(req.params.id);

    const pipeline = [
      { $match: { _id: objectId, isDeleted: false } },
      
      // Populate creator
      {
        $lookup: {
          from: "admins",
          localField: "creator",
          foreignField: "_id",
          as: "creator"
        }
      },
      { $unwind: { path: "$creator", preserveNullAndEmptyArrays: true } },

      // Select final fields with localization
      {
        $project: {
          icon: 1,
          status: 1,
          createdAt: 1,
          title: `$title.${locale}`,
          summary: `$summary.${locale}`,
          "creator._id": 1,
          "creator.name": 1,
          "creator.avatar": 1,
        },
      },
    ];

    const newsTypes = await NewsType.aggregate(pipeline);
    
    if (!newsTypes || newsTypes.length === 0) {
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
      data: newsTypes[0]
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
    const { title, description, icon } = req.body; // Changed from summary to description
    
    // Prepare update data
    const updateData = {};
    
    // Handle title updates
    if (title !== undefined) {
      if (title === null || title.trim() === "") {
        return res.status(400).json({
          acknowledgement: false,
          message: "Error",
          description: "عنوان فارسی نمی‌تواند خالی باشد"
        });
      }
      
      // === آماده‌سازی داده برای ترجمه ===
      const dataForTranslation = {
        title
      };

      // === ترجمه قبل از ذخیره ===
      const translations = await translateFields(dataForTranslation, {
        stringFields: ["title"]
      });

      const en = translations.en?.fields || {};
      const tr = translations.tr?.fields || {};
      const ar = translations.ar?.fields || {};

      updateData.title = {
        fa: title,
        en: en.title || title,
        tr: tr.title || title,
        ar: ar.title || title
      };
    }
    
    // Handle description updates
    if (description !== undefined) { // Changed from summary to description
      if (description === null || description.trim() === "") { // Changed from summary to description
        return res.status(400).json({
          acknowledgement: false,
          message: "Error",
          description: "توضیحات فارسی نمی‌تواند خالی باشد" // Changed from summary to description
        });
      }
      
      // === آماده‌سازی داده برای ترجمه ===
      const dataForTranslation = {
        title: description // Using title field for translation since translateFields expects it
      };

      // === ترجمه قبل از ذخیره ===
      const translations = await translateFields(dataForTranslation, {
        stringFields: ["title"]
      });

      const en = translations.en?.fields || {};
      const tr = translations.tr?.fields || {};
      const ar = translations.ar?.fields || {};

      updateData.summary = { // This stays as summary in the model
        fa: description, // Changed from summary to description
        en: en.title || description, // Using title from translation
        tr: tr.title || description, // Using title from translation
        ar: ar.title || description // Using title from translation
      };
    }

    if (icon) {
      updateData.icon = icon;
    }

    const result = await NewsType.findByIdAndUpdate(
      req.params.id,
      updateData,
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
      description: "نوع خبر با موفقیت بروزرسانی و ترجمه شد",
      data: result
    });
  } catch (error) {
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطایی در بروزرسانی نوع خبر رخ داد",
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


