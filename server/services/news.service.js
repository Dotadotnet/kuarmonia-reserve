/* internal imports */
const News = require("../models/news.model");
const Product = require("../models/product.model");
const Admin = require("../models/admin.model");
const remove = require("../utils/remove.util");

/* 📌 اضافه کردن اخبار جدید */
exports.addNews = async (req, res) => {
  try {
    const { title, summary, tags, category, content, publishDate, socialLinks, visibility, readTime, source } = req.body;
    let thumbnail = null;
    if (req.uploadedFiles["thumbnail"].length) {
      thumbnail = {
        url: req.uploadedFiles["thumbnail"][0].url,
        public_id: req.uploadedFiles["thumbnail"][0].key,
      };
    }
    console.log(category)
    const news = new News({
      title,
      summary,
      thumbnail,
      tags: JSON.parse(tags), 
      categories:JSON.parse(category),
      content,
      publishDate,
      socialLinks:JSON.parse(socialLinks),
      visibility:visibility ? 'public' : 'private',
      readTime,
      source: JSON.parse(source), 
      creator: req.admin._id,
    });

    const result = await news.save();

    await Admin.findByIdAndUpdate(result.creator, {
      $set: { news: result._id },
    });

    res.status(201).json({
      acknowledgement: true,
      message: "Created",
      description: "اخبار با موفقیت ایجاد شد",
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطایی در ثبت اخبار رخ داد",
      error: error.message,
    });
  }
};

/* 📌 دریافت همه اخبار */
exports.getAllNews = async ( res) => {
  try {
    const news = await News.find().populate([
      {
        path: "categories",
        select: "title _id icon", 
      }]);
    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "لیست اخبار با موفقیت دریافت شد",
      data: news,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطایی در دریافت اخبار رخ داد",
      error: error.message,
    });
  }
};

/* 📌 دریافت یک اخبار */
exports.getNews = async (req, res) => {
  try {
    const news = await News.findById(req.params.id).populate([
      {
        path: "creator",
        select: "name avatar", 
      },
      {
        path: "tags",
        select: "title _id keynotes", 
      },
      {
        path: "categories",
        select: "title _id icon", 
      },
      {
        path: "socialLinks.network",
        select: "title platform icon", 
      },
    ]);
    if (!news) {
      return res.status(404).json({
        acknowledgement: false,
        message: "Not Found",
        description: "اخبار مورد نظر یافت نشد",
      });
    }
    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "اخبار با موفقیت دریافت شد",
      data: news,
    });
  } catch (error) {
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطایی در دریافت اخبار رخ داد",
      error: error.message,
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
      new: true,
    });

    if (!result) {
      return res.status(404).json({
        acknowledgement: false,
        message: "Not Found",
        description: "اخبار مورد نظر برای بروزرسانی یافت نشد",
      });
    }

    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "اخبار با موفقیت بروزرسانی شد",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطایی در بروزرسانی اخبار رخ داد",
      error: error.message,
    });
  }
};

/* 📌 حذف اخبار */
exports.deleteNews = async (req, res) => {
  try {
    const news = await News.findByIdAndDelete(req.params.id);

    if (!news) {
      return res.status(404).json({
        acknowledgement: false,
        message: "Not Found",
        description: "اخبار مورد نظر برای حذف یافت نشد",
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
      description: "اخبار با موفقیت حذف شد",
    });
  } catch (error) {
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطایی در حذف اخبار رخ داد",
      error: error.message,
    });
  }
};
