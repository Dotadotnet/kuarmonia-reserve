/* internal imports */
const Address = require("../models/address.model");
const Rent = require("../models/rent.model");
const Translation = require("../models/translation.model");
const translateFields = require("../utils/translateFields");
const defaultDomain = process.env.NEXT_PUBLIC_CLIENT_URL;
const { generateSlug, generateSeoFields } = require("../utils/seoUtils");
const Category = require("../models/category.model");

exports.addRent = async (req, res) => {
  try {
    const {
      title,
      summary,
      description,
      information,
      location,
      socialLinks,
      category,
      address,
      duration,
      ...otherInfo
    } = req.body;

    const parseAddress = JSON.parse(address);
    const parsedInformation = JSON.parse(information);
    const parsedLocation = JSON.parse(location);
    const parsedDuration = JSON.parse(duration);

    let gallery = [];

    if (req.uploadedFiles["gallery"]?.length > 0) {
      gallery = req.uploadedFiles["gallery"].map((file) => ({
        url: file.url,
        public_id: file.key
      }));
    }

    // بررسی وجود آدرس با شماره تلفن مشابه
    let addressProp = await Address.findOne({ phone: parseAddress.phone });

    if (!addressProp) {
      addressProp = await Address.create({
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
    }

    const rent = new Rent({
      ...otherInfo,
      title,
      gallery,
      category,
      duration: parsedDuration,
      socialLinks: JSON.parse(socialLinks),
      address: addressProp._id,
      creator: req.admin._id
    });

    const result = await rent.save();
    const slug = await generateSlug(title);
    const { metaTitle, metaDescription } = generateSeoFields({
      title,
      summary,
      categoryTitle: await Category.findById(category).title
    });
    const canonicalUrl = `${defaultDomain}/rent/${slug}`;

    try {
      const translations = await translateFields(
        {
          title,
          description,
          summary,
          canonicalUrl,
          slug,
          metaTitle,
          metaDescription,
          information: parsedInformation
        },
        {
          stringFields: [
            "title",
            "slug",
            "description",
            "summary",
            "metaTitle",
            "metaDescription",
            "canonicalUrl"
          ],
          arrayStringFields: ["information"]
        }
      );

      const translationDocs = Object.entries(translations).map(
        ([lang, { fields }]) => ({
          language: lang,
          refModel: "Rent",
          refId: result._id,
          fields
        })
      );

      const savedTranslations = await Translation.insertMany(translationDocs);

      const translationInfos = savedTranslations.map((t) => ({
        translation: t._id,
        language: t.language
      }));

      await Rent.findByIdAndUpdate(result._id, {
        $set: { translations: translationInfos }
      });
    } catch (translationError) {
      await Rent.findByIdAndDelete(result._id);
      return res.status(500).json({
        acknowledgement: false,
        message: "Translation Save Error",
        description: "خطا در ذخیره ترجمه‌ها. اجاره حذف شد.",
        error: translationError.message
      });
    }

    res.status(201).json({
      acknowledgement: true,
      message: "Created",
      description: "هتل‌ها با موفقیت ایجاد شد",
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

/* 📌 دریافت همه هتل ها ها */
exports.getRents = async (req, res) => {
  try {
    const rents = await Rent.find({ isDeleted: false }).populate([
      {
        path: "translations.translation",
        match: { language: req.locale }
      },
      {
        path: "address",
        select: "city"
      },
      {
        path: "creator",
        select: "name avatar"
      }
    ]);
    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "لیست  هتل ها با موفقیت دریافت شد",
      data: rents
    });
  } catch (error) {
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطایی در دریافت هتل ها  رخ داد",
      error: error.message
    });
  }
};
function mergeTranslationFields(doc, locale) {
  const rawFields = doc.translations.find((t) => t.language === locale)
    ?.translation?.fields;

  const fields =
    rawFields instanceof Map
      ? Object.fromEntries(rawFields.entries())
      : rawFields;

  if (fields) {
    Object.assign(doc, fields);
  }

  return doc;
}

/* 📌 دریافت یک هتل ها  */
exports.getRent = async (req, res) => {
  try {
    console.log("Rent ID from params:", req.params.id);
    const rentId = parseInt(req.params.id, 10);
    const rent = await Rent.findOne({ rentId }).populate([
      {
        path: "translations.translation",
        match: { language: req.locale }
      },
      {
        path: "address",
        select: "city country "
      },
      {
        path: "reviews",
        options: { sort: { updatedAt: -1 } },
       
      }
    ]);

    mergeTranslationFields(rent, req.locale);

    // console.log("rent:", rent);
    if (!rent) {
      return res.status(404).json({
        acknowledgement: false,
        message: "Not Found",
        description: "هتل ها  مورد نظر یافت نشد"
      });
    }

    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "هتل ها  با موفقیت دریافت شد",
      data: rent
    });
  } catch (error) {
    console.error("Error fetching rent:", error);
    console.error("Error message:", error.message);
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطایی در دریافت هتل ها  رخ داد",
      error: error.message
    });
  }
};

/* 📌 بروزرسانی هتل ها  */
exports.updateRent = async (req, res) => {
  try {
    const updatedRent = req.body;
    console.log("Updated Rent:", updatedRent);
    console.log("Rent ID:", req.params.id);

    const result = await Rent.findByIdAndUpdate(req.params.id, updatedRent, {
      new: true
    });

    if (!result) {
      return res.status(404).json({
        acknowledgement: false,
        message: "Not Found",
        description: "هتل ها  مورد نظر برای بروزرسانی یافت نشد"
      });
    }

    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "هتل ها  با موفقیت بروزرسانی شد",
      data: result
    });
  } catch (error) {
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطایی در بروزرسانی هتل ها  رخ داد",
      error: error.message
    });
  }
};

/* 📌 حذف هتل ها  */
exports.deleteRent = async (req, res) => {
  try {
    const rent = await Rent.findByIdAndUpdate(
      req.params.id,
      { isDeleted: true },
      { new: true }
    );
    if (!rent) {
      return res.status(404).json({
        acknowledgement: false,
        message: "Not Found",
        description: "هتل ها  مورد نظر برای حذف یافت نشد"
      });
    }

    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "هتل ها  با موفقیت حذف شد"
    });
  } catch (error) {
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطایی در حذف هتل ها  رخ داد",
      error: error.message
    });
  }
};
