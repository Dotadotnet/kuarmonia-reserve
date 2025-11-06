const Country = require("../models/country.model");
const mongoose = require("mongoose");
const { generateSlug } = require("../utils/seoUtils");
const remove = require("../utils/remove.util");
const translateFields = require("../utils/translateFields");

exports.getCountries = async (req, res) => {
  const { page = 1, limit = 10, search = "" } = req.query;
  const skip = (page - 1) * limit;
  const locale = req.locale || "fa";

  console.log("Query params:", { locale, search, page, limit });

  try {
    const matchStage = {
      isDeleted: false,
    };

    console.log("Initial matchStage:", matchStage);

    // Add search functionality
    if (search) {
      matchStage[`name.${locale}`] = { $regex: search, $options: "i" };
      console.log("Search matchStage:", matchStage);
    }

    // Handle limit and skip values
    const safeLimit = isFinite(Number(limit)) ? Number(limit) : 10;
    const safeSkip = isFinite(Number(skip)) ? Number(skip) : 0;

    console.log("Pipeline stages - skip:", safeSkip, "limit:", safeLimit);

    const pipeline = [
      { $match: matchStage },
      { $sort: { createdAt: -1 } },
      { $skip: safeSkip },
      { $limit: safeLimit },

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
          countryId: 1,
          name: `$name.${locale}`,
          icon: 1,
          code: 1,
          status: 1,
          slug: `$slug.${locale}`,
          createdAt: 1,
          "creator._id": 1,
          "creator.name": 1,
          "creator.avatar": 1,
        },
      },
    ];

    console.log("Executing pipeline:", JSON.stringify(pipeline, null, 2));

    const countries = await Country.aggregate(pipeline);
    console.log("Countries found:", countries);

    // Get total count
    const total = await Country.countDocuments(matchStage);
    console.log("Total countries:", total);

    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "کشورها با موفقیت دریافت شدند",
      data: countries,
      total,
      page: Number(page),
      limit: safeLimit,
    });
  } catch (error) {
    console.error("Error fetching countries:", error);
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطا در دریافت کشورها",
      error: error.message,
    });
  }
};

exports.getCountry = async (req, res) => {
  try {
    const { id } = req.params;
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
          countryId: 1,
          name: `$name.${locale}`,
          icon: 1,
          code: 1,
          status: 1,
          slug: `$slug.${locale}`,
          createdAt: 1,
          creator: {
            _id: "$creator._id",
            name: { $ifNull: [`$creator.name.${locale}`, `$creator.name`] },
            avatar: "$creator.avatar"
          }
        }
      }
    ];

    const [country] = await Country.aggregate(pipeline);

    if (!country) {
      return res.status(404).json({
        acknowledgement: false,
        message: "Not Found",
        description: "کشور پیدا نشد"
      });
    }

    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "کشور با موفقیت دریافت شد",
      data: country
    });
  } catch (error) {
    console.error("Error fetching country:", error);
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطا در دریافت کشور",
      error: error.message
    });
  }
};

/* 📌 اضافه کردن کشور جدید */
/* 📌 اضافه کردن کشور جدید */
exports.addCountry = async (req, res) => {
  try {
    const { name, code, icon } = req.body;

    // Validation
    if (!name) {
      return res.status(400).json({
        acknowledgement: false,
        message: "Bad Request",
        description: "نام کشور الزامی است",
      });
    }

    if (!code) {
      return res.status(400).json({
        acknowledgement: false,
        message: "Bad Request",
        description: "کد کشور الزامی است",
      });
    }

    // Check if country with this code already exists
    const existingCountry = await Country.findOne({ code });
    if (existingCountry) {
      return res.status(400).json({
        acknowledgement: false,
        message: "Bad Request",
        description: "کشور با این کد قبلاً ایجاد شده است",
      });
    }

    // ✅ داده ورودی برای ترجمه
    const dataForTranslation = { name };

    // Translate name field
    const translations = await translateFields(dataForTranslation, {
      stringFields: ["name"],
    });

    const en = translations.en?.fields || {};
    const tr = translations.tr?.fields || {};

    // Create new country
    const country = new Country({
      name: {
        fa: name,
        en: en.name || name,
        tr: tr.name || name,
      },
      code,
      icon: icon || "",
      slug: {
        fa: await generateSlug(name),
        en: await generateSlug(en.name || name),
        tr: await generateSlug(tr.name || name),
      },
      creator: req.admin._id,
    });

    const result = await country.save();

    res.status(201).json({
      acknowledgement: true,
      message: "Created",
      description: "کشور با موفقیت ایجاد شد",
      data: result,
    });

  } catch (error) {
    console.error("Error adding country:", error);
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطا در ایجاد کشور",
      error: error.message,
    });
  }
};


/* 📌 بروزرسانی کشور */
exports.updateCountry = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, code, icon, status } = req.body;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        acknowledgement: false,
        message: "Bad Request",
        description: "شناسه نامعتبر است"
      });
    }

    // Prepare update data
    const updateData = {};
    
    if (name) {
      const parsedName = JSON.parse(name);
      
      // Prepare data for translation
      const dataForTranslation = {
        name: parsedName.fa
      };

      // Translate name field
      const translations = await translateFields(dataForTranslation, {
        stringFields: ["name"]
      });

      const en = translations.en?.fields || {};
      const tr = translations.tr?.fields || {};

      updateData.name = {
        fa: parsedName.fa,
        en: en.name || parsedName.en || parsedName.fa,
        tr: tr.name || parsedName.tr || parsedName.fa
      };
      
      // Update slugs
      updateData.slug = {
        fa: await generateSlug(parsedName.fa),
        en: await generateSlug(en.name || parsedName.en || parsedName.fa),
        tr: await generateSlug(tr.name || parsedName.tr || parsedName.fa)
      };
    }
    
    if (code) updateData.code = code;
    if (icon !== undefined) updateData.icon = icon;
    if (status) updateData.status = status;

    // Update country
    const result = await Country.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!result) {
      return res.status(404).json({
        acknowledgement: false,
        message: "Not Found",
        description: "کشور مورد نظر برای بروزرسانی یافت نشد"
      });
    }

    res.status(200).json({
      acknowledgement: true,
      message: "Updated",
      description: "کشور با موفقیت بروزرسانی شد",
      data: result
    });
  } catch (error) {
    console.error("Error updating country:", error);
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطا در بروزرسانی کشور",
      error: error.message
    });
  }
};

/* 📌 حذف کشور */
exports.deleteCountry = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        acknowledgement: false,
        message: "Bad Request",
        description: "شناسه نامعتبر است"
      });
    }

    const country = await Country.findById(id);

    if (!country) {
      return res.status(404).json({
        acknowledgement: false,
        message: "Not Found",
        description: "کشور مورد نظر برای حذف یافت نشد"
      });
    }

    // Delete the country
    await Country.findByIdAndDelete(id);

    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "کشور با موفقیت حذف شد"
    });
  } catch (error) {
    console.error("Error deleting country:", error);
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطایی در حذف کشور رخ داد",
      error: error.message
    });
  }
};
