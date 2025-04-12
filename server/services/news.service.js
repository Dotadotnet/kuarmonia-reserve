/* internal imports */
const News = require("../models/news.model");
const Product = require("../models/product.model");
const Admin = require("../models/admin.model");
const remove = require("../utils/remove.util");

/* 📌 اضافه کردن محل مراسم جدید */
exports.addNews = async (req, res) => {
  try {
    const { title, code, symbol, exchangeRate, country } = req.body;

    const news = new News({
      title,
      code,
      symbol,
      exchangeRate,
      country,
      creator: req.user._id,
    });

    const result = await news.save();

    await Admin.findByIdAndUpdate(result.creator, {
      $set: { news: result._id },
    });

    res.status(201).json({
      acknowledgement: true,
      message: "Created",
      description: "محل مراسم با موفقیت ایجاد شد",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطایی در ثبت محل مراسم رخ داد",
      error: error.message,
    });
  }
};

/* 📌 دریافت همه محل مراسم */
exports.getNews = async ( res) => {
  try {
    const news = await News.find().populate("creator");
    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "لیست محل مراسم با موفقیت دریافت شد",
      data: news,
    });
  } catch (error) {
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطایی در دریافت محل مراسم رخ داد",
      error: error.message,
    });
  }
};

/* 📌 دریافت یک محل مراسم */
exports.getNews = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);

    if (!news) {
      return res.status(404).json({
        acknowledgement: false,
        message: "Not Found",
        description: "محل مراسم مورد نظر یافت نشد",
      });
    }

    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "محل مراسم با موفقیت دریافت شد",
      data: news,
    });
  } catch (error) {
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطایی در دریافت محل مراسم رخ داد",
      error: error.message,
    });
  }
};

/* 📌 بروزرسانی محل مراسم */
exports.updateNews = async (req, res) => {
  try {
    const updatedNews = req.body;
    console.log("Updated News:", updatedNews);
    console.log("News ID:", req.params.id);

    const result = await News.findByIdAndUpdate(req.params.id, updatedNews, {
      new: true,
    });

    if (!result) {
      return res.status(404).json({
        acknowledgement: false,
        message: "Not Found",
        description: "محل مراسم مورد نظر برای بروزرسانی یافت نشد",
      });
    }

    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "محل مراسم با موفقیت بروزرسانی شد",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطایی در بروزرسانی محل مراسم رخ داد",
      error: error.message,
    });
  }
};

/* 📌 حذف محل مراسم */
exports.deleteNews = async (req, res) => {
  try {
    const news = await News.findByIdAndDelete(req.params.id);

    if (!news) {
      return res.status(404).json({
        acknowledgement: false,
        message: "Not Found",
        description: "محل مراسم مورد نظر برای حذف یافت نشد",
      });
    }

    await remove(news.logo?.public_id);

    await Product.updateMany({ news: req.params.id }, { $unset: { news: "" } });
    await Admin.findByIdAndUpdate(news.creator, {
      $unset: { news: "" },
    });

    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "محل مراسم با موفقیت حذف شد",
    });
  } catch (error) {
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطایی در حذف محل مراسم رخ داد",
      error: error.message,
    });
  }
};
