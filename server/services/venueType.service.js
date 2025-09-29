/* internal imports */
const VenueType = require("../models/venueType.model");
const Translation = require("../models/translation.model");
const { generateSlug } = require("../utils/seoUtils");
const translateFields = require("../utils/translateFields");

/* 📌 اضافه کردن نوع مکان مراسم جدید */
exports.addVenueType = async (req, res) => {
  try {
    const { title ,description,icon} = req.body;

    const venueType = new VenueType({
      title,
      icon,
      creator: req.admin._id,
    });

    const result = await venueType.save();


    const slug = await generateSlug(title);

    try {
      const translations = await translateFields(
        {
          title,
          description,
          slug,
        },
        {
          stringFields: ["title", "description", "slug"]
        }
      );
      const translationDocs = Object.entries(translations).map(
        ([lang, { fields }]) => ({
          language: lang,
          refModel: "VenueType",
          refId: result._id,
          fields
        })
      );
      const insertedTranslations = await Translation.insertMany(translationDocs);

      const translationInfos = insertedTranslations.map((t) => ({
        translation: t._id,
        language: t.language
      }));
      await VenueType.findByIdAndUpdate(result._id, {
        $set: { translations: translationInfos }
      });

      return res.status(201).json({
        acknowledgement: true,
        message: "Created",
        description: "دسته‌بندی با موفقیت ایجاد و ترجمه شد.",
        data: result
      });
    } catch (translationError) {
      console.log(translationError.message);
      await VenueType.findByIdAndDelete(result._id);
      return res.status(500).json({
        acknowledgement: false,
        message: "Translation Save Error",
        description: "خطا در ذخیره ترجمه‌ها. نوع مکان مراسم حذف شد.",
        error: translationError.message
      });
    }

    res.status(201).json({
      acknowledgement: true,
      message: "Created",
      description: "نوع مکان مراسم با موفقیت ایجاد شد",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطایی در ثبت نوع مکان مراسم رخ داد",
      error: error.message,
    });
  }
};

exports.getVenueTypes = async (res) => {
  const venueTypes = await VenueType.find({ isDeleted: false }).populate('creator');
  res.status(200).json({
    acknowledgement: true,
    message: "OK",
    description: "دریافت موفق نوع مکان مراسم",
    data: venueTypes
  });
};

/* 📌 دریافت یک نوع مکان مراسم */
exports.getVenueType = async (req, res) => {
  try {
    const venueType = await VenueType.findById(req.params.id);

    if (!venueType) {
      return res.status(404).json({
        acknowledgement: false,
        message: "Not Found",
        description: "نوع مکان مراسم مورد نظر یافت نشد",
      });
    }

    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "نوع مکان مراسم با موفقیت دریافت شد",
      data: venueType,
    });
  } catch (error) {
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطایی در دریافت نوع مکان مراسم رخ داد",
      error: error.message,
    });
  }
};

/* 📌 بروزرسانی نوع مکان مراسم */
exports.updateVenueType = async (req, res) => {
  try {
    const updatedVenueType = req.body;
    console.log("Updated VenueType:", updatedVenueType);
    console.log("VenueType ID:", req.params.id);

    const result = await VenueType.findByIdAndUpdate(req.params.id, updatedVenueType, {
      new: true,
    });

    if (!result) {
      return res.status(404).json({
        acknowledgement: false,
        message: "Not Found",
        description: "نوع مکان مراسم مورد نظر برای بروزرسانی یافت نشد",
      });
    }

    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "نوع مکان مراسم با موفقیت بروزرسانی شد",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطایی در بروزرسانی نوع مکان مراسم رخ داد",
      error: error.message,
    });
  }
};

/* 📌 حذف نوع مکان مراسم */
exports.deleteVenueType = async (req, res) => {
  try {
    const venueType = await VenueType.findByIdAndUpdate(
      req.params.id,
      { isDeleted: true },
      { new: true }
  );
    if (!venueType) {
      return res.status(404).json({
        acknowledgement: false,
        message: "Not Found",
        description: "نوع مکان مراسم مورد نظر برای حذف یافت نشد",
      });
    }


    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "نوع مکان مراسم با موفقیت حذف شد",
    });
  } catch (error) {
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطایی در حذف نوع مکان مراسم رخ داد",
      error: error.message,
    });
  }
};
