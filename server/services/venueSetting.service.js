/* internal imports */
const VenueSetting = require("../models/venueSetting.model");
const Product = require("../models/product.model");
const Admin = require("../models/admin.model");
const remove = require("../utils/remove.util");

/* 📌 اضافه کردن تنظیمات جدید */
exports.addVenueSetting = async (req, res) => {
  try {
    const { title ,description,icon} = req.body;
    const venueSetting = new VenueSetting({
      title,
      description,
      icon,
      creator: req.admin._id
    });

    const result = await venueSetting.save();

    await Admin.findByIdAndUpdate(result.creator, {
      $set: { venueSetting: result._id }
    });

    res.status(201).json({
      acknowledgement: true,
      message: "Created",
      description: "تنظیمات با موفقیت ایجاد شد",
      data: result
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطایی در ثبت تنظیمات رخ داد",
      error: error.message
    });
  }
};

/* 📌 دریافت همه تنظیماتها */
exports.getVenueSettings = async ( res) => {
  try {
    const venueSettings = await VenueSetting.find({ isDeleted: false }).populate("creator");
    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "دریافت موفق تنظیمات",
      data: venueSettings
    });
  } catch (error) {
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطایی در دریافت تنظیمات رخ داد",
      error: error.message
    });
  }
};

/* 📌 دریافت یک تنظیمات */
exports.getVenueSetting = async (req, res) => {
  try {
    const venueSetting = await VenueSetting.findById(req.params.id);

    if (!venueSetting) {
      return res.status(404).json({
        acknowledgement: false,
        message: "Not Found",
        description: "تنظیمات مورد نظر یافت نشد"
      });
    }

    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "تنظیمات با موفقیت دریافت شد",
      data: venueSetting
    });
  } catch (error) {
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطایی در دریافت تنظیمات رخ داد",
      error: error.message
    });
  }
};

/* 📌 بروزرسانی تنظیمات */
exports.updateVenueSetting = async (req, res) => {
  try {
    const updatedVenueSetting = req.body;
    console.log("Updated VenueSetting:", updatedVenueSetting);
    console.log("VenueSetting ID:", req.params.id);

    const result = await VenueSetting.findByIdAndUpdate(
      req.params.id,
      updatedVenueSetting,
      {
        new: true
      }
    );

    if (!result) {
      return res.status(404).json({
        acknowledgement: false,
        message: "Not Found",
        description: "تنظیمات مورد نظر برای بروزرسانی یافت نشد"
      });
    }

    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "تنظیمات با موفقیت بروزرسانی شد",
      data: result
    });
  } catch (error) {
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطایی در بروزرسانی تنظیمات رخ داد",
      error: error.message
    });
  }
};

/* 📌 حذف تنظیمات */
exports.deleteVenueSetting = async (req, res) => {
  try {
    const venueSetting = await VenueSetting.findByIdAndUpdate(
      req.params.id,
      { isDeleted: true },
      { new: true }
  );
  
    if (!venueSetting) {
      return res.status(404).json({
        acknowledgement: false,
        message: "Not Found",
        description: "تنظیمات مورد نظر برای حذف یافت نشد"
      });
    }

    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "تنظیمات با موفقیت حذف شد"
    });
  } catch (error) {
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطایی در حذف تنظیمات رخ داد",
      error: error.message
    });
  }
};
