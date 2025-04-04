/* internal imports */
const VenueService = require("../models/venueService.model");
const Admin = require("../models/admin.model");
const remove = require("../utils/remove.util");

exports.addVenueService = async (req, res) => {
  try {
    const { title ,description,icon} = req.body;
    const venueService = new VenueService({
      title,
      description,
      icon,
      creator: req.admin._id
    });

    const result = await venueService.save();

    await Admin.findByIdAndUpdate(result.creator, {
      $set: { venueService: result._id }
    });

    res.status(201).json({
      acknowledgement: true,
      message: "Created",
      description: "خدمات با موفقیت ایجاد شد",
      data: result
    });
  } catch (error) {
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطایی در ثبت خدمات رخ داد",
      error: error.message
    });
  }
};

/* 📌 دریافت همه خدماتها */
exports.getVenueServices = async ( res) => {
  try {
    const venueService = await VenueService.find({ isDeleted: false }).populate("creator");
    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "دریافت موفق خدمات",
      data: venueService
    });
  } catch (error) {
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطایی در دریافت خدمات رخ داد",
      error: error.message
    });
  }
};

/* 📌 دریافت یک خدمات */
exports.getVenueService = async (req, res) => {
  try {
    const venueService = await VenueService.findById(req.params.id);

    if (!venueService) {
      return res.status(404).json({
        acknowledgement: false,
        message: "Not Found",
        description: "خدمات مورد نظر یافت نشد"
      });
    }

    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "خدمات با موفقیت دریافت شد",
      data: venueService
    });
  } catch (error) {
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطایی در دریافت خدمات رخ داد",
      error: error.message
    });
  }
};

/* 📌 بروزرسانی خدمات */
exports.updateVenueService = async (req, res) => {
  try {
    const updatedVenueService = req.body;
    console.log("Updated VenueService:", updatedVenueService);
    console.log("VenueService ID:", req.params.id);

    const result = await VenueService.findByIdAndUpdate(
      req.params.id,
      updatedVenueService,
      {
        new: true
      }
    );

    if (!result) {
      return res.status(404).json({
        acknowledgement: false,
        message: "Not Found",
        description: "خدمات مورد نظر برای بروزرسانی یافت نشد"
      });
    }

    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "خدمات با موفقیت بروزرسانی شد",
      data: result
    });
  } catch (error) {
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطایی در بروزرسانی خدمات رخ داد",
      error: error.message
    });
  }
};

/* 📌 حذف خدمات */
exports.deleteVenueService = async (req, res) => {
  try {
    const venueService = await VenueService.findByIdAndUpdate(
      req.params.id,
      { isDeleted: true },
      { new: true }
  );
    if (!venueService) {
      return res.status(404).json({
        acknowledgement: false,
        message: "Not Found",
        description: "خدمات مورد نظر برای حذف یافت نشد"
      });
    }



    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "خدمات با موفقیت حذف شد"
    });
  } catch (error) {
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطایی در حذف خدمات رخ داد",
      error: error.message
    });
  }
};
