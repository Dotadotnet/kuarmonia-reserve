/* internal imports */
const VenueAward = require("../models/venueAward.model");
const Admin = require("../models/admin.model");
const remove = require("../utils/remove.util");

/* 📌 اضافه کردن جایزه  جدید */
exports.addVenueAward = async (req, res) => {
  try {
    const { ...otherInfo } = req.body;
    let thumbnail = null;
    if (req.uploadedFiles["thumbnail"]?.length) {
      thumbnail = {
        url: req.uploadedFiles["thumbnail"][0].url,
        public_id: req.uploadedFiles["thumbnail"][0].key
      };
    }
    const venueAward = new VenueAward({
      ...otherInfo,
      thumbnail,
      creator: req.admin._id,
    });

    const result = await venueAward.save();

    res.status(201).json({
      acknowledgement: true,
      message: "Created",
      description: "جایزه  با موفقیت ایجاد شد",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطایی در ثبت جایزه  رخ داد",
      error: error.message,
    });
  }
};

/* 📌 دریافت همه جایزه ها */
exports.getVenueAwards  = async ( res) => {
  try {
    const venueAwards = await VenueAward.find({ isDeleted: false }).populate("creator");
    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "لیست  جوایز با موفقیت دریافت شد",
      data: venueAwards,
    });
  } catch (error) {
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطایی در دریافت جوایز  رخ داد",
      error: error.message,
    });
  }
};

/* 📌 دریافت یک جایزه  */
exports.getVenueAward = async (req, res) => {
  try {
    const venueAward = await VenueAward.findById(req.params.id);

    if (!venueAward) {
      return res.status(404).json({
        acknowledgement: false,
        message: "Not Found",
        description: "جایزه  مورد نظر یافت نشد",
      });
    }

    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "جایزه  با موفقیت دریافت شد",
      data: venueAward,
    });
  } catch (error) {
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطایی در دریافت جایزه  رخ داد",
      error: error.message,
    });
  }
};

/* 📌 بروزرسانی جایزه  */
exports.updateVenueAward = async (req, res) => {
  try {
    const updatedVenueAward = req.body;
    console.log("Updated VenueAward:", updatedVenueAward);
    console.log("VenueAward ID:", req.params.id);

    const result = await VenueAward.findByIdAndUpdate(req.params.id, updatedVenueAward, {
      new: true,
    });

    if (!result) {
      return res.status(404).json({
        acknowledgement: false,
        message: "Not Found",
        description: "جایزه  مورد نظر برای بروزرسانی یافت نشد",
      });
    }

    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "جایزه  با موفقیت بروزرسانی شد",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطایی در بروزرسانی جایزه  رخ داد",
      error: error.message,
    });
  }
};

/* 📌 حذف جایزه  */
exports.deleteVenueAward = async (req, res) => {
  try {
    const venueAward = await VenueAward.findByIdAndUpdate(
      req.params.id,
      { isDeleted: true },
      { new: true }
  );
    if (!venueAward) {
      return res.status(404).json({
        acknowledgement: false,
        message: "Not Found",
        description: "جایزه  مورد نظر برای حذف یافت نشد",
      });
    }


    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "جایزه  با موفقیت حذف شد",
    });
  } catch (error) {
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطایی در حذف جایزه  رخ داد",
      error: error.message,
    });
  }
};
