/* internal imports */
const Currency = require("../models/currency.model");
const Product = require("../models/product.model");
const Admin = require("../models/admin.model");
const remove = require("../utils/remove.util");

/* 📌 اضافه کردن ارز جدید */
exports.addCurrency = async (req, res) => {
  try {
    const { title, code, symbol, exchangeRate, country } = req.body;

    const currency = new Currency({
      title,
      code,
      symbol,
      exchangeRate,
      country,
      creator: req.admin._id,
    });

    const result = await currency.save();

    await Admin.findByIdAndUpdate(result.creator, {
      $set: { currency: result._id },
    });

    res.status(201).json({
      acknowledgement: true,
      message: "Created",
      description: "ارز با موفقیت ایجاد شد",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطایی در ثبت ارز رخ داد",
      error: error.message,
    });
  }
};

/* 📌 دریافت همه ارزها */
exports.getCurrencies = async ( res) => {
  try {
    const currencies = await Currency.find({ isDeleted: { $ne: true } }).populate("creator");
    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "لیست ارزها با موفقیت دریافت شد",
      data: currencies,
    });
  } catch (error) {
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطایی در دریافت ارزها رخ داد",
      error: error.message,
    });
  }
};

/* 📌 دریافت یک ارز */
exports.getCurrency = async (req, res) => {
  try {
    const currency = await Currency.findById(req.params.id);

    if (!currency) {
      return res.status(404).json({
        acknowledgement: false,
        message: "Not Found",
        description: "ارز مورد نظر یافت نشد",
      });
    }

    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "ارز با موفقیت دریافت شد",
      data: currency,
    });
  } catch (error) {
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطایی در دریافت ارز رخ داد",
      error: error.message,
    });
  }
};

/* 📌 بروزرسانی ارز */
exports.updateCurrency = async (req, res) => {
  try {
    const updatedCurrency = req.body;
    console.log("Updated Currency:", updatedCurrency);
    console.log("Currency ID:", req.params.id);

    const result = await Currency.findByIdAndUpdate(req.params.id, updatedCurrency, {
      new: true,
    });

    if (!result) {
      return res.status(404).json({
        acknowledgement: false,
        message: "Not Found",
        description: "ارز مورد نظر برای بروزرسانی یافت نشد",
      });
    }

    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "ارز با موفقیت بروزرسانی شد",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطایی در بروزرسانی ارز رخ داد",
      error: error.message,
    });
  }
};

/* 📌 حذف ارز */
exports.deleteCurrency = async (req, res) => {
  try {
    const currency = await Currency.findByIdAndUpdate(req.params.id,
      {
        isDeleted: true,
        deletedAt: Date.now(),
      },
      { new: true }
    );
    if (!currency) {
      return res.status(404).json({
        acknowledgement: false,
        message: "Not Found",
        description: "ارز مورد نظر برای حذف یافت نشد",
      });
    }


    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "ارز با موفقیت حذف شد",
    });
  } catch (error) {
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطایی در حذف ارز رخ داد",
      error: error.message,
    });
  }
};
