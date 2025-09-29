/* internal imports */
const VenueVendor = require("../models/venueVendor.model");
const Translation = require("../models/translation.model");
const translateFields = require("../utils/translateFields");

exports.addVenueVendor = async (req, res) => {
  try {
    const { socialLinks,...otherInfo } = req.body;
    console.log(req.body)
    let thumbnail = null;
    if (req.uploadedFiles["thumbnail"]?.length) {
      thumbnail = {
        url: req.uploadedFiles["thumbnail"][0].url,
        public_id: req.uploadedFiles["thumbnail"][0].key
      };
    }
    const venueVendor = new VenueVendor({
      ...otherInfo,
      thumbnail,
      socialLinks:JSON.parse(socialLinks),
      creator: req.admin._id,
    });

    const result = await venueVendor.save();

    try {
      const translations = await translateFields(
        { title: otherInfo.title, description: otherInfo.description, city: otherInfo.city, country: otherInfo.country },
        { stringFields: ["title", "description", "city", "country"] }
      );

      const translationDocs = Object.entries(translations).map(
        ([lang, { fields }]) => ({
          language: lang,
          refModel: "VenueVendor",
          refId: result._id,
          fields
        })
      );
      const insertedTranslations = await Translation.insertMany(translationDocs);
      const translationInfos = insertedTranslations.map((t) => ({
        translation: t._id,
        language: t.language
      }));
      await VenueVendor.findByIdAndUpdate(result._id, {
        $set: { translations: translationInfos }
      });
    } catch (translationError) {
      await VenueVendor.findByIdAndDelete(result._id);
      return res.status(500).json({
        acknowledgement: false,
        message: "Translation Save Error",
        description: "خطا در ذخیره ترجمه‌ها. همکار حذف شد.",
        error: translationError.message
      });
    }

    res.status(201).json({
      acknowledgement: true,
      message: "Created",
      description: "همکار  با موفقیت ایجاد شد",
      data: result,
    });
  } catch (error) {
    console.log(error.message)
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطایی در ثبت همکار  رخ داد",
      error: error.message,
    });
  }
};

/* 📌 دریافت همه همکار ها */
exports.getVenueVendors  = async ( req, res) => {
  try {
    const venueVendors = await VenueVendor.find({ isDeleted: false }).populate([
      { path: 'translations.translation', match: { language: req.locale } },
      { path: 'creator', select: 'name avatar' },
      { path: 'category', select: 'title icon' }
    ]);
    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "لیست  جوایز با موفقیت دریافت شد",
      data: venueVendors,
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

/* 📌 دریافت یک همکار  */
exports.getVenueVendor = async (req, res) => {
  try {
    const venueVendor = await VenueVendor.findById(req.params.id);

    if (!venueVendor) {
      return res.status(404).json({
        acknowledgement: false,
        message: "Not Found",
        description: "همکار  مورد نظر یافت نشد",
      });
    }

    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "همکار  با موفقیت دریافت شد",
      data: venueVendor,
    });
  } catch (error) {
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطایی در دریافت همکار  رخ داد",
      error: error.message,
    });
  }
};

/* 📌 بروزرسانی همکار  */
exports.updateVenueVendor = async (req, res) => {
  try {
    const updatedVenueVendor = req.body;
    console.log("Updated VenueVendor:", updatedVenueVendor);
    console.log("VenueVendor ID:", req.params.id);

    const result = await VenueVendor.findByIdAndUpdate(req.params.id, updatedVenueVendor, {
      new: true,
    });

    if (!result) {
      return res.status(404).json({
        acknowledgement: false,
        message: "Not Found",
        description: "همکار  مورد نظر برای بروزرسانی یافت نشد",
      });
    }

    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "همکار  با موفقیت بروزرسانی شد",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطایی در بروزرسانی همکار  رخ داد",
      error: error.message,
    });
  }
};

/* 📌 حذف همکار  */
exports.deleteVenueVendor = async (req, res) => {
  try {
    const venueVendor = await VenueVendor.findByIdAndUpdate(
      req.params.id,
      { isDeleted: true },
      { new: true }
  );
    if (!venueVendor) {
      return res.status(404).json({
        acknowledgement: false,
        message: "Not Found",
        description: "همکار  مورد نظر برای حذف یافت نشد",
      });
    }


    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "همکار  با موفقیت حذف شد",
    });
  } catch (error) {
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطایی در حذف همکار  رخ داد",
      error: error.message,
    });
  }
};
