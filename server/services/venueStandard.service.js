/* internal imports */
const VenueStandard = require("../models/venueStandard.model");
const Product = require("../models/product.model");
const Admin = require("../models/user.model");
const remove = require("../utils/remove.util");

/* 📌 اضافه کردن استاندارد جدید */
exports.addVenueStandard = async (req, res) => {
  try {
    const { ...otherInfo } = req.body;
    let thumbnail = null;
    if (req.uploadedFiles["thumbnail"]?.length) {
      thumbnail = {
        url: req.uploadedFiles["thumbnail"][0].url,
        public_id: req.uploadedFiles["thumbnail"][0].key
      };
    }
    const venueStandard = new VenueStandard({
      ...otherInfo,
      thumbnail,
      creator: req.admin._id,
    });
    const result = await venueStandard.save();



    res.status(201).json({
      acknowledgement: true,
      message: "Created",
      description: "استاندارد با موفقیت ایجاد شد",
      data: result,
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطایی در ثبت  رخ داد",
      error: error.message,
    });
  }
};

/* 📌 دریافت همه استانداردها */
exports.getVenueStandards = async (res) => {
  try {
    const venueAminities = await VenueStandard.find({ isDeleted: false }).populate("creator");
    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "لیست استانداردها با موفقیت دریافت شد",
      data: venueAminities,
    });
  } catch (error) {
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطایی در دریافت استانداردها رخ داد",
      error: error.message,
    });
  }
};

/* 📌 دریافت یک استاندارد */
exports.getVenueStandard = async (req, res) => {
  try {
    const venueStandard = await VenueStandard.findById(req.params.id);

    if (!venueStandard) {
      return res.status(404).json({
        acknowledgement: false,
        message: "Not Found",
        description: "استاندارد مورد نظر یافت نشد",
      });
    }

    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "استاندارد با موفقیت دریافت شد",
      data: venueStandard,
    });
  } catch (error) {
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطایی در دریافت استاندارد رخ داد",
      error: error.message,
    });
  }
};

/* 📌 بروزرسانی استاندارد */
exports.updateVenueStandard = async (req, res) => {
  try {
    const updatedVenueStandard = req.body;
    console.log("Updated VenueStandard:", updatedVenueStandard);
    console.log("VenueStandard ID:", req.params.id);

    const result = await VenueStandard.findByIdAndUpdate(req.params.id, updatedVenueStandard, {
      new: true,
    });

    if (!result) {
      return res.status(404).json({
        acknowledgement: false,
        message: "Not Found",
        description: "استاندارد مورد نظر برای بروزرسانی یافت نشد",
      });
    }

    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "استاندارد با موفقیت بروزرسانی شد",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطایی در بروزرسانی استاندارد رخ داد",
      error: error.message,
    });
  }
};

/* 📌 حذف استاندارد */
exports.deleteVenueStandard = async (req, res) => {
  try {
    const venueStandard = await VenueStandard.findByIdAndUpdate(
      req.params.id,
      { isDeleted: true },
      { new: true }
  );
  
    if (!venueStandard) {
      return res.status(404).json({
        acknowledgement: false,
        message: "Not Found",
        description: "استاندارد مورد نظر برای حذف یافت نشد",
      });
    }


    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "استاندارد با موفقیت حذف شد",
    });
  } catch (error) {
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطایی در حذف استاندارد رخ داد",
      error: error.message,
    });
  }
};
