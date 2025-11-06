const Category = require("../models/category.model");
const mongoose = require("mongoose");
const translateFields = require("../utils/translateFields");
const { generateSlug } = require("../utils/seoUtils");

exports.addCategory = async (req, res) => {
  try {
    let { title, description } = req.body;

    // Use automatic translation for title
    const titleTranslations = await translateFields(
      { title },
      { stringFields: ["title"] }
    );

    const translatedTitle = {
      fa: title,
      en: titleTranslations.en.fields.title,
      tr: titleTranslations.tr.fields.title
    };

    // Use automatic translation for description
    const descriptionTranslations = await translateFields(
      { description },
      { stringFields: ["description"] }
    );

    const translatedDescription = {
      fa: description,
      en: descriptionTranslations.en.fields.description,
      tr: descriptionTranslations.tr.fields.description
    };

    const category = new Category({
      title: translatedTitle,
      description: translatedDescription,
      slug: await generateSlug(titleTranslations.en.fields.title),
      creator: req.admin._id
    });

    const result = await category.save();

    res.status(201).json({
      acknowledgement: true,
      message: "Created",
      description: "دسته‌بندی با موفقیت ایجاد و ترجمه شد",
      data: result
    });
  } catch (error) {
    console.error("Error in addCategory:", error);

    // Handle validation errors
    if (error.name === 'ValidationError') {
      const errors = {};
      Object.keys(error.errors).forEach(key => {
        errors[key] = error.errors[key].message;
      });

      return res.status(400).json({
        acknowledgement: false,
        message: "Validation Error",
        description: "خطا در اعتبارسنجی داده‌ها",
        errors
      });
    }

    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطایی در ایجاد دسته‌بندی رخ داد",
      error: error.message
    });
  }
};

exports.getCategories = async (req, res) => {
  const { page = 1, limit = 10, search = "" } = req.query;
  const skip = (page - 1) * limit;
  const locale = req.locale || "fa";

  try {
    const matchStage = {
      isDeleted: false,
    };

    // Add search functionality
    if (search) {
      matchStage.$or = [
        { [`title.${locale}`]: { $regex: search, $options: "i" } },
        { [`description.${locale}`]: { $regex: search, $options: "i" } }
      ];
    }

    // Handle limit and skip values
    const safeLimit = isFinite(Number(limit)) ? Number(limit) : 10;
    const safeSkip = isFinite(Number(skip)) ? Number(skip) : 0;

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
          categoryId: 1,
          title: `$title.${locale}`,
          description: `$description.${locale}`,
          slug: 1,
          canonicalUrl: 1,
          icon: 1,
          thumbnail: 1,
          status: 1,
          createdAt: 1,
          "creator._id": 1,
          "creator.name": 1,
          "creator.avatar": 1,
        },
      },
    ];

    const categories = await Category.aggregate(pipeline);

    // Get total count
    const total = await Category.countDocuments(matchStage);

    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "دسته‌بندی‌ها با موفقیت دریافت شدند",
      data: categories,
      total,
      page: Number(page),
      limit: safeLimit,
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطا در دریافت دسته‌بندی‌ها",
      error: error.message,
    });
  }
};

exports.getCategory = async (req, res) => {
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
          categoryId: 1,
          title: `$title.${locale}`,
          description: `$description.${locale}`,
          slug: 1,
          canonicalUrl: 1,
          icon: 1,
          thumbnail: 1,
          status: 1,
          createdAt: 1,
          creator: {
            _id: "$creator._id",
            name: { $ifNull: [`$creator.name.${locale}`, `$creator.name`] },
            avatar: "$creator.avatar"
          }
        }
      }
    ];

    const [category] = await Category.aggregate(pipeline);

    if (!category) {
      return res.status(404).json({
        acknowledgement: false,
        message: "Not Found",
        description: "دسته‌بندی پیدا نشد"
      });
    }

    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "دسته‌بندی با موفقیت دریافت شد",
      data: category
    });
  } catch (error) {
    console.error("Error fetching category:", error);
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطا در دریافت دسته‌بندی",
      error: error.message
    });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    let updatedCategory = req.body;

    // Use automatic translation for title if provided
    if (updatedCategory.title) {
      const translations = await translateFields(
        { title: updatedCategory.title },
        { stringFields: ["title"] }
      );

      updatedCategory.title = {
        fa: updatedCategory.title,
        en: translations.en.fields.title,
        tr: translations.tr.fields.title
      };
      
      updatedCategory.slug = await generateSlug(translations.en.fields.title);
    }

    // Use automatic translation for description if provided
    if (updatedCategory.description) {
      const translations = await translateFields(
        { description: updatedCategory.description },
        { stringFields: ["description"] }
      );

      updatedCategory.description = {
        fa: updatedCategory.description,
        en: translations.en.fields.description,
        tr: translations.tr.fields.description
      };
    }

    const result = await Category.findByIdAndUpdate(req.params.id, updatedCategory, {
      new: true
    });

    if (!result) {
      return res.status(404).json({
        acknowledgement: false,
        message: "Not Found",
        description: "دسته‌بندی مورد نظر یافت نشد"
      });
    }

    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "دسته‌بندی با موفقیت ویرایش و ترجمه شد",
      data: result
    });
  } catch (error) {
    console.error("Error in updateCategory:", error);
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطایی در بروزرسانی دسته‌بندی رخ داد",
      error: error.message
    });
  }
};

/* delete category */
exports.deleteCategory = async (req, res) => {
  const category = await Category.findByIdAndUpdate(
    req.params.id,
    {
      isDeleted: true,
      deletedAt: Date.now()
    },
    { new: true }
  );

  if (!category) {
    return res.status(404).json({
      acknowledgement: false,
      message: "دسته‌بندی پیدا نشد",
      description: "دسته‌بندی که می‌خواهید حذف کنید، وجود ندارد"
    });
  }

  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "دسته‌بندی با موفقیت حذف شد"
  });
};
