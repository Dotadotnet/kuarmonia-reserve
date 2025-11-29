/* internal imports */
const NewsCountry = require("../models/newsCountry.model");
const Admin = require("../models/admin.model");
const { translate } = require("google-translate-api-x");
const Translation = require("../models/translation.model");
const translateFields = require("../utils/translateFields");
const { generateSlug } = require("../utils/seoUtils");

exports.addNewsCountry = async (req, res) => {
  try {
    const { title, code, icon } = req.body;
    
    // === Validation اولیه ===
    if (!title) return res.status(400).json({ acknowledgement: false, description: "عنوان فارسی الزامی است" });
    if (!code) return res.status(400).json({ acknowledgement: false, description: "کد کشور الزامی است" });
    
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

    const newsCountry = new NewsCountry({
      title: {
        fa: title,
        en: en.title || title,
        tr: tr.title || title
      },
      code,
      icon,
      creator: req.admin._id
    });

    const result = await newsCountry.save();
    
    res.status(201).json({
      acknowledgement: true,
      message: "Created",
      description: "کشور خبر با موفقیت ایجاد و ترجمه شد",
      data: result
    });
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
exports.getNewsCountries = async (req, res) => {
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
          code: 1,
          icon: 1,
          status: 1,
          createdAt: 1,
          title: `$title.${locale}`,
          "creator._id": 1,
          "creator.name": 1,
          "creator.avatar": 1,
        },
      },
    ];

    const countries = await NewsCountry.aggregate(pipeline);
    
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
          code: 1,
          icon: 1,
          status: 1,
          createdAt: 1,
          title: `$title.${locale}`,
          "creator._id": 1,
          "creator.name": 1,
          "creator.avatar": 1,
        },
      },
    ];

    const countries = await NewsCountry.aggregate(pipeline);
    
    if (!countries || countries.length === 0) {
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
      data: countries[0]
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
    const { title, code, icon } = req.body;
    
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

      updateData.title = {
        fa: title,
        en: en.title || title,
        tr: tr.title || title
      };
    }

    if (code !== undefined) {
      if (code === null || code.trim() === "") {
        return res.status(400).json({
          acknowledgement: false,
          message: "Error",
          description: "کد کشور نمی‌تواند خالی باشد"
        });
      }
      updateData.code = code;
    }

    if (icon) {
      updateData.icon = icon;
    }

    const result = await NewsCountry.findByIdAndUpdate(
      req.params.id,
      updateData,
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
      description: "کشور خبر با موفقیت بروزرسانی و ترجمه شد",
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




