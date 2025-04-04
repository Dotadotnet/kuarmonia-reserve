/* internal imports */
const CeremonyType = require("../models/ceremonyType.model");
const Product = require("../models/product.model");
const Admin = require("../models/admin.model");
const remove = require("../utils/remove.util");

exports.addCeremonyType = async (req, res) => {
  try {
    const { title ,description,icon} = req.body;


    const ceremonyType = new CeremonyType({
      title,
      description,
      icon,
      creator: req.admin._id
    });

    const result = await ceremonyType.save();

    res.status(201).json({
      acknowledgement: true,
      message: "Created",
      description: "نوع مراسم با موفقیت ایجاد شد",
      data: result
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطایی در ثبت نوع مراسم رخ داد",
      error: error.message
    });
  }
};

/* 📌 دریافت همه نوع مراسمها */
exports.getCeremonyTypes = async (res) => {

  const ceremonyTypes = await CeremonyType.find({ isDeleted: false }).populate('creator');
  res.status(200).json({
    acknowledgement: true,
    message: "OK",
    description: "دریافت موفق نوع مراسمات",
    data: ceremonyTypes
  });
};



/* 📌 دریافت یک نوع مراسم */
exports.getCeremonyType = async (req, res) => {
  try {
    const ceremonyType = await CeremonyType.findById(req.params.id);

    if (!ceremonyType) {
      return res.status(404).json({
        acknowledgement: false,
        message: "Not Found",
        description: "نوع مراسم مورد نظر یافت نشد"
      });
    }

    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "نوع مراسم با موفقیت دریافت شد",
      data: ceremonyType
    });
  } catch (error) {
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطایی در دریافت نوع مراسم رخ داد",
      error: error.message
    });
  }
};

/* 📌 بروزرسانی نوع مراسم */
exports.updateCeremonyType = async (req, res) => {
  try {
    const updatedCeremonyType = req.body;

    const result = await CeremonyType.findByIdAndUpdate(
      req.params.id,
      updatedCeremonyType,
      {
        new: true
      }
    );

    if (!result) {
      return res.status(404).json({
        acknowledgement: false,
        message: "Not Found",
        description: "نوع مراسم مورد نظر برای بروزرسانی یافت نشد"
      });
    }

    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "نوع مراسم با موفقیت بروزرسانی شد",
      data: result
    });
  } catch (error) {
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطایی در بروزرسانی نوع مراسم رخ داد",
      error: error.message
    });
  }
};

/* 📌 حذف نوع مراسم */
exports.deleteCeremonyType = async (req, res) => {
  try {
    const ceremonyType = await CeremonyType.findByIdAndUpdate(
      req.params.id,
      { isDeleted: true },
      { new: true }
  );
    if (!ceremonyType) {
      return res.status(404).json({
        acknowledgement: false,
        message: "Not Found",
        description: "نوع مراسم مورد نظر برای حذف یافت نشد"
      });
    }

    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "نوع مراسم با موفقیت حذف شد"
    });
  } catch (error) {
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطایی در حذف نوع مراسم رخ داد",
      error: error.message
    });
  }
};
