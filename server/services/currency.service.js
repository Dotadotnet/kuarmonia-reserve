const Currency = require("../models/currency.model");
const Country = require("../models/country.model");
const mongoose = require("mongoose");

exports.getCurrencies = async (req, res) => {
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
        { code: { $regex: search, $options: "i" } },
        { symbol: { $regex: search, $options: "i" } }
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

      // Populate country
      {
        $lookup: {
          from: "countries",
          localField: "country",
          foreignField: "_id",
          as: "country",
        },
      },
      { $unwind: { path: "$country", preserveNullAndEmptyArrays: true } },

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
          currencyId: 1,
          title: `$title.${locale}`,
          code: 1,
          symbol: 1,
          exchangeRate: 1,
          status: 1,
          createdAt: 1,
          country: {
            _id: "$country._id",
            name: `$country.name.${locale}`,
            icon: "$country.icon",
            code: "$country.code"
          },
          "creator._id": 1,
          "creator.name": 1,
          "creator.avatar": 1,
        },
      },
    ];

    const currencies = await Currency.aggregate(pipeline);

    // Get total count
    const total = await Currency.countDocuments(matchStage);

    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "ارزها با موفقیت دریافت شدند",
      data: currencies,
      total,
      page: Number(page),
      limit: safeLimit,
    });
  } catch (error) {
    console.error("Error fetching currencies:", error);
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطا در دریافت ارزها",
      error: error.message,
    });
  }
};

exports.getCurrency = async (req, res) => {
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

      // Populate country
      {
        $lookup: {
          from: "countries",
          localField: "country",
          foreignField: "_id",
          as: "country",
        },
      },
      { $unwind: { path: "$country", preserveNullAndEmptyArrays: true } },

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
          currencyId: 1,
          title: `$title.${locale}`,
          code: 1,
          symbol: 1,
          exchangeRate: 1,
          status: 1,
          createdAt: 1,
          country: {
            _id: "$country._id",
            name: `$country.name.${locale}`,
            icon: "$country.icon",
            code: "$country.code"
          },
          creator: {
            _id: "$creator._id",
            name: { $ifNull: [`$creator.name.${locale}`, `$creator.name`] },
            avatar: "$creator.avatar"
          }
        }
      }
    ];

    const [currency] = await Currency.aggregate(pipeline);

    if (!currency) {
      return res.status(404).json({
        acknowledgement: false,
        message: "Not Found",
        description: "ارز پیدا نشد"
      });
    }

    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "ارز با موفقیت دریافت شد",
      data: currency
    });
  } catch (error) {
    console.error("Error fetching currency:", error);
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطا در دریافت ارز",
      error: error.message
    });
  }
};


