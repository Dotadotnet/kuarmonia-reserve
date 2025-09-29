/* internal imports */
const VenueAmenity = require("../models/venueAmenity.model");
const Admin = require("../models/admin.model");
const Translation = require("../models/translation.model");
const translateFields = require("../utils/translateFields");

/* 📌 اضافه کردن امکانات جدید */
exports.addVenueAmenity = async (req, res) => {
  try {
    const { title ,description,icon} = req.body;

    const venueAmenity = new VenueAmenity({
      title,
      description,
      icon,
      creator: req.admin._id
    });

    const result = await venueAmenity.save();

    try {
      const translations = await translateFields(
        { title, description },
        { stringFields: ["title", "description"] }
      );

      const translationDocs = Object.entries(translations).map(
        ([lang, { fields }]) => ({
          language: lang,
          refModel: "VenueAmenity",
          refId: result._id,
          fields
        })
      );

      const insertedTranslations = await Translation.insertMany(translationDocs);
      const translationInfos = insertedTranslations.map((t) => ({
        translation: t._id,
        language: t.language
      }));

      await VenueAmenity.findByIdAndUpdate(result._id, {
        $set: { translations: translationInfos }
      });
    } catch (translationError) {
      await VenueAmenity.findByIdAndDelete(result._id);
      return res.status(500).json({
        acknowledgement: false,
        message: "Translation Save Error",
        description: "خطا در ذخیره ترجمه‌ها. امکانات حذف شد.",
        error: translationError.message
      });
    }

    await Admin.findByIdAndUpdate(result.creator, {
      $set: { venueAmenity: result._id }
    });

    res.status(201).json({
      acknowledgement: true,
      message: "Created",
      description: "امکانات با موفقیت ایجاد شد",
      data: result
    });
  } catch (error) {
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطایی در ثبت امکانات رخ داد",
      error: error.message
    });
  }
};

/* 📌 دریافت همه امکانات */
exports.getVenueAmenities = async ( req, res) => {
  try {
    const venueAminities = await VenueAmenity.find({ isDeleted: false }).populate([
      { path: "translations.translation", match: { language: req.locale } },
      { path: "creator", select: "name avatar" }
    ]);
    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "لیست امکانات با موفقیت دریافت شد",
      data: venueAminities
    });
  } catch (error) {
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطایی در دریافت امکانات رخ داد",
      error: error.message
    });
  }
};

/* 📌 دریافت یک امکانات */
exports.getVenueAmenity = async (req, res) => {
  try {
    const venueAmenity = await VenueAmenity.findById(req.params.id);

    if (!venueAmenity) {
      return res.status(404).json({
        acknowledgement: false,
        message: "Not Found",
        description: "امکانات مورد نظر یافت نشد"
      });
    }

    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "امکانات با موفقیت دریافت شد",
      data: venueAmenity
    });
  } catch (error) {
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطایی در دریافت امکانات رخ داد",
      error: error.message
    });
  }
};

/* 📌 بروزرسانی امکانات */
exports.updateVenueAmenity = async (req, res) => {
  try {
    const updatedVenueAmenity = req.body;
    console.log("Updated VenueAmenity:", updatedVenueAmenity);
    console.log("VenueAmenity ID:", req.params.id);

    const result = await VenueAmenity.findByIdAndUpdate(
      req.params.id,
      updatedVenueAmenity,
      {
        new: true
      }
    );

    if (!result) {
      return res.status(404).json({
        acknowledgement: false,
        message: "Not Found",
        description: "امکانات مورد نظر برای بروزرسانی یافت نشد"
      });
    }

    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "امکانات با موفقیت بروزرسانی شد",
      data: result
    });
  } catch (error) {
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطایی در بروزرسانی امکانات رخ داد",
      error: error.message
    });
  }
};

/* 📌 حذف امکانات */
exports.deleteVenueAmenity = async (req, res) => {
  try {
    const venueAmenity = await VenueAmenity.findByIdAndUpdate(
      req.params.id,
      { isDeleted: true },
      { new: true }
  );
    if (!venueAmenity) {
      return res.status(404).json({
        acknowledgement: false,
        message: "Not Found",
        description: "امکانات مورد نظر برای حذف یافت نشد"
      });
    }


    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "امکانات با موفقیت حذف شد"
    });
  } catch (error) {
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطایی در حذف امکانات رخ داد",
      error: error.message
    });
  }
};
