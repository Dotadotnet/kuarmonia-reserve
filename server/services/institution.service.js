/* internal imports */
const Address = require("../models/address.model");
const Institution = require("../models/institution.model");
const Translation = require("../models/translation.model");
const translateFields = require("../utils/translateFields");

exports.addInstitution = async (req, res) => {
  try {
    const {
      title,
      description,
      address,
      faculty,
      location,
      languagesOffered,
      ...otherInfo
    } = req.body;
    const parsedFaculty = JSON.parse(faculty);
    const parsedLanguagesOffered = JSON.parse(languagesOffered);
    const parseAddress = JSON.parse(address);
    const parsedLocation = JSON.parse(location);

    let thumbnail = null;

    if (req.uploadedFiles["thumbnail"]?.length) {
      thumbnail = {
        url: req.uploadedFiles["thumbnail"][0].url,
        public_id: req.uploadedFiles["thumbnail"][0].key
      };
    }
    const addressProp = await Address.create({
      country: parseAddress.country,
      state: parseAddress.state,
      city: parseAddress.city,
      street: parseAddress.street,
      plateNumber: parseAddress.plateNumber,
      floor: parseAddress.floor,
      unit: parseAddress.unit,
      phone: parseAddress.phone,
      email: parseAddress.email,
      postalCode: parseAddress.postalCode,
      location: parsedLocation
    });
    const institution = new Institution({
      ...otherInfo,
      thumbnail,
      address: addressProp._id,
      creator: req.admin._id
    });

    const result = await institution.save();

    try {
      const translations = await translateFields(
        {
          title,
          description,
          faculty: parsedFaculty,
          languagesOffered: parsedLanguagesOffered
        },
        {
          stringFields: ["title", "description"],
          arrayStringFields: ["faculty", "languagesOffered"]
        }
      );
      const translationDocs = Object.entries(translations).map(
        ([lang, { fields }]) => ({
          language: lang,
          refModel: "Institution",
          refId: result._id,
          fields
        })
      );
      const savedTranslations = await Translation.insertMany(translationDocs);
      const translationInfos = savedTranslations.map((t) => ({
        translation: t._id,
        language: t.language
      }));
      await Institution.findByIdAndUpdate(result._id, {
        $set: { translations: translationInfos }
      });
    } catch (translationError) {
      await Institution.findByIdAndDelete(result._id);
      return res.status(500).json({
        acknowledgement: false,
        message: "Translation Save Error",
        description: "خطا در ذخیره ترجمه‌ها. مرکز علمی حذف شد.",
        error: translationError.message
      });
    }
    res.status(201).json({
      acknowledgement: true,
      message: "Created",
      description: "مرکز علمی  با موفقیت ایجاد شد",
      data: result
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: error.message,
      error: error.message
    });
  }
};

/* 📌 دریافت همه مرکز علمی ها */
exports.getInstitutions = async (req, res) => {
  try {
    const institutions = await Institution.find({ isDeleted: false }).populate([
      {
        path: "translations.translation",
        match: { language: req.locale }
      },
      {
        path: "creator",
        select: "name avatar"
      }
    ]);
    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "لیست  جوایز با موفقیت دریافت شد",
      data: institutions
    });
  } catch (error) {
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطایی در دریافت جوایز  رخ داد",
      error: error.message
    });
  }
};

/* 📌 دریافت یک مرکز علمی  */
exports.getInstitution = async (req, res) => {
  try {
    const institution = await Institution.findById(req.params.id);

    if (!institution) {
      return res.status(404).json({
        acknowledgement: false,
        message: "Not Found",
        description: "مرکز علمی  مورد نظر یافت نشد"
      });
    }

    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "مرکز علمی  با موفقیت دریافت شد",
      data: institution
    });
  } catch (error) {
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطایی در دریافت مرکز علمی  رخ داد",
      error: error.message
    });
  }
};

/* 📌 بروزرسانی مرکز علمی  */
exports.updateInstitution = async (req, res) => {
  try {
    const updatedInstitution = req.body;
    console.log("Updated Institution:", updatedInstitution);
    console.log("Institution ID:", req.params.id);

    const result = await Institution.findByIdAndUpdate(
      req.params.id,
      updatedInstitution,
      {
        new: true
      }
    );

    if (!result) {
      return res.status(404).json({
        acknowledgement: false,
        message: "Not Found",
        description: "مرکز علمی  مورد نظر برای بروزرسانی یافت نشد"
      });
    }

    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "مرکز علمی  با موفقیت بروزرسانی شد",
      data: result
    });
  } catch (error) {
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطایی در بروزرسانی مرکز علمی  رخ داد",
      error: error.message
    });
  }
};

/* 📌 حذف مرکز علمی  */
exports.deleteInstitution = async (req, res) => {
  try {
    const institution = await Institution.findByIdAndUpdate(
      req.params.id,
      { isDeleted: true },
      { new: true }
    );
    if (!institution) {
      return res.status(404).json({
        acknowledgement: false,
        message: "Not Found",
        description: "مرکز علمی  مورد نظر برای حذف یافت نشد"
      });
    }

    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "مرکز علمی  با موفقیت حذف شد"
    });
  } catch (error) {
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطایی در حذف مرکز علمی  رخ داد",
      error: error.message
    });
  }
};
