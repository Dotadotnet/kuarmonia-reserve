/* internal imports */
const Venue = require("../models/venue.model");
const Product = require("../models/product.model");
const Admin = require("../models/admin.model");
const remove = require("../utils/remove.util");

/* 📌 اضافه کردن محل مراسم جدید */
exports.addVenue = async (req, res) => {
  try {
    const { title, code, symbol, exchangeRate, country } = req.body;

    const venue = new Venue({
      title,
      code,
      symbol,
      exchangeRate,
      country,
      creator: req.user._id
    });

    const result = await venue.save();

    await Admin.findByIdAndUpdate(result.creator, {
      $set: { venue: result._id }
    });

    res.status(201).json({
      acknowledgement: true,
      message: "Created",
      description: "محل مراسم با موفقیت ایجاد شد",
      data: result
    });
  } catch (error) {
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطایی در ثبت محل مراسم رخ داد",
      error: error.message
    });
  }
};

/* 📌 دریافت همه محل مراسم */
exports.getVenues = async (res) => {
  try {
    const venues = await Venue.find().populate("creator");
    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "لیست محل مراسم با موفقیت دریافت شد",
      data: venues
    });
  } catch (error) {
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطایی در دریافت محل مراسم رخ داد",
      error: error.message
    });
  }
};

/* 📌 دریافت یک محل مراسم */
exports.getVenue = async (req, res) => {
  try {
    const venue = await Venue.findById(req.params.id);

    if (!venue) {
      return res.status(404).json({
        acknowledgement: false,
        message: "Not Found",
        description: "محل مراسم مورد نظر یافت نشد"
      });
    }

    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "محل مراسم با موفقیت دریافت شد",
      data: venue
    });
  } catch (error) {
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطایی در دریافت محل مراسم رخ داد",
      error: error.message
    });
  }
};

/* 📌 بروزرسانی محل مراسم */
exports.updateVenue = async (req, res) => {
  try {
    const updatedVenue = req.body;
    console.log("Updated Venue:", updatedVenue);
    console.log("Venue ID:", req.params.id);

    const result = await Venue.findByIdAndUpdate(req.params.id, updatedVenue, {
      new: true
    });

    if (!result) {
      return res.status(404).json({
        acknowledgement: false,
        message: "Not Found",
        description: "محل مراسم مورد نظر برای بروزرسانی یافت نشد"
      });
    }

    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "محل مراسم با موفقیت بروزرسانی شد",
      data: result
    });
  } catch (error) {
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطایی در بروزرسانی محل مراسم رخ داد",
      error: error.message
    });
  }
};

/* 📌 حذف محل مراسم */
exports.deleteVenue = async (req, res) => {
  try {
    const venue = await Venue.findByIdAndDelete(req.params.id);

    if (!venue) {
      return res.status(404).json({
        acknowledgement: false,
        message: "Not Found",
        description: "محل مراسم مورد نظر برای حذف یافت نشد"
      });
    }

    await remove(venue.logo?.public_id);

    await Product.updateMany(
      { venue: req.params.id },
      { $unset: { venue: "" } }
    );
    await Admin.findByIdAndUpdate(venue.creator, {
      $unset: { venue: "" }
    });

    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "محل مراسم با موفقیت حذف شد"
    });
  } catch (error) {
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطایی در حذف محل مراسم رخ داد",
      error: error.message
    });
  }
};
