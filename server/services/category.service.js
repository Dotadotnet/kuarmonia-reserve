const Category = require("../models/category.model");
const mongoose = require("mongoose");

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


