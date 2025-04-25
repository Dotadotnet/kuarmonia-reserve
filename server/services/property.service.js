/* internal import */
// const Property = require("../models/property.model");
const Property = require("../models/property.model");
const User = require("../models/user.model");
const remove = require("../utils/remove.util");
const Category = require("../models/category.model");
const Address = require("../models/address.model");
const { translate } = require("google-translate-api-x");
const Translation = require("../models/translation.model");
/* add new property */
exports.addProperty = async (req, res) => {
  try {
    const {
      title,
      description,
      summary,
      tags,
      features,
      socialLinks,
      amenities,
      location,
      variants,
      address,
      ...otherInformation
    } = req.body;
    let thumbnail = null;
    let gallery = [];

    const parseAddress = JSON.parse(address);
    const parsedTags = JSON.parse(tags);
    const parsedFeatures = JSON.parse(features);
    const parsedSocialLinks = JSON.parse(socialLinks);
    const parsedAmenities = JSON.parse(amenities);
    console.log("parsedTags", parsedAmenities);
    const parsedLocation = JSON.parse(location);
    const parsedVariants = JSON.parse(variants);

    let translatedTitle = "";
    let translatedSummary = "";
    let translatedDescription = "";
    let translatedTitleTr = "";
    let translatedSummaryTr = "";
    let translatedDescriptionTr = "";
    try {
      console.log("Translating title to English...");
      const resultTitleEn = await translate(title, { to: "en", client: "gtx" });
      translatedTitle = resultTitleEn.text;
      console.log("Translated Title (EN):", translatedTitle);

      console.log("Translating summary to English...");
      const resultSummaryEn = await translate(summary, {
        to: "en",
        client: "gtx"
      });
      translatedSummary = resultSummaryEn.text;
      console.log("Translated Summary (EN):", translatedSummary);

      console.log("Translating description to English...");
      const resultDescriptionEn = await translate(description, {
        to: "en",
        client: "gtx"
      });
      translatedDescription = resultDescriptionEn.text;
      console.log("Translated Description (EN):", translatedDescription);

      console.log("Translating title to Turkish...");
      const resultTitleTr = await translate(title, { to: "tr", client: "gtx" });
      translatedTitleTr = resultTitleTr.text;
      console.log("Translated Title (TR):", translatedTitleTr);

      console.log("Translating summary to Turkish...");
      const resultSummaryTr = await translate(summary, {
        to: "tr",
        client: "gtx"
      });
      translatedSummaryTr = resultSummaryTr.text;
      console.log("Translated Summary (TR):", translatedSummaryTr);

      console.log("Translating description to Turkish...");
      const resultDescriptionTr = await translate(description, {
        to: "tr",
        client: "gtx"
      });
      translatedDescriptionTr = resultDescriptionTr.text;
      console.log("Translated Description (TR):", translatedDescriptionTr);
    } catch (err) {
      console.error("خطا در ترجمه:", err);
      return res.status(500).json({
        acknowledgement: false,
        message: "Error",
        description: "خطایی در فرآیند ترجمه رخ داد",
        error: err.message
      });
    }
    if (req.uploadedFiles["thumbnail"]?.length) {
      thumbnail = {
        url: req.uploadedFiles["thumbnail"][0].url,
        public_id: req.uploadedFiles["thumbnail"][0].key
      };
    }

    if (req.uploadedFiles["gallery"]?.length > 0) {
      gallery = req.uploadedFiles["gallery"].map((file) => ({
        url: file.url,
        public_id: file.key
      }));
    }
    console.log("address", parseAddress);
    const addressProp = await Address.create({
      country: parseAddress.country,
      state: parseAddress.state,
      city: parseAddress.city,
      street: parseAddress.street,
      plateNumber: parseAddress.plateNumber,
      phone: parseAddress.phone,
      email: parseAddress.email, // Optional, depending on your schema
      postalCode: parseAddress.postalCode
    });
    const property = await Property.create({
      ...otherInformation,
      creator: req.admin._id,
      thumbnail,
      gallery,
      tags: parsedTags,
      title,
      description,
      summary,
      socialLinks: parsedSocialLinks,
      features: parsedFeatures,
      amenities: parsedAmenities,
      location: parsedLocation,
      variants: parsedVariants,
      address: addressProp._id
    });
    const { metaTitle, metaDescription } = property;

    const [translatedMetaTitleEn, translatedMetaDescriptionEn] =
      await Promise.all([
        translate(metaTitle, { to: "en", client: "gtx" }),
        translate(metaDescription, { to: "en", client: "gtx" })
      ]);

    const [translatedMetaTitleTr, translatedMetaDescriptionTr] =
      await Promise.all([
        translate(metaTitle, { to: "tr", client: "gtx" }),
        translate(metaDescription, { to: "tr", client: "gtx" })
      ]);
    const translationData = [
      {
        language: "en",
        refModel: "Property",
        refId: property._id,
        fields: {
          title: translatedTitle,
          summary: translatedSummary,
          description: translatedDescription,
          metaTitle: translatedMetaTitleEn.text,
          metaDescription: translatedMetaDescriptionEn.text
        }
      },
      {
        language: "tr",
        refModel: "Property",
        refId: property._id,
        fields: {
          title: translatedTitleTr,
          summary: translatedSummaryTr,
          description: translatedDescriptionTr,
          metaTitle: translatedMetaTitleTr.text,
          metaDescription: translatedMetaDescriptionTr.text
        }
      }
    ];

    try {
      await Translation.insertMany(translationData);
    } catch (translationError) {
      await Property.findByIdAndDelete(property._id);
      return res.status(500).json({
        acknowledgement: false,
        message: "Translation Save Error",
        description: "خطا در ذخیره ترجمه‌ها. ملک حذف شد.",
        error: translationError.message
      });
    }

    res.status(201).json({
      acknowledgement: true,
      message: "Created",
      description: "ملک با موفقیت ایجاد شد"
    });
  } catch (error) {
    console.error("❌ Error in addProperty:", error);
    res.status(500).json({
      acknowledgement: false,
      message: "ایجاد ملک با خطا مواجه شد",
      error: error?.message || "خطای ناشناخته"
    });
  }
};

exports.getPropertyById = async (req, res) => {
  const property = await Property.findOne({
    propertyId: req.params.id
  }).populate([
    {
      path: "creator",
      select: "name avatar" // دریافت فقط name و avatar از creator
    },
    {
      path: "tags",
      select: "title _id" // دریافت فقط title و _id از tags
    }
  ]);

  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "ملک با موفقیت دریافت شد",
    data: property
  });
};

/* get all propertys */
exports.getProperties = async (res) => {
  const propertys = await Property.find().populate([
    {
      path: "creator",
      select: "name avatar"
    },
    {
      path: "category",
      select: "title"
    }
  ]);
  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "واحد ها با موفقیت دریافت شدند",
    data: propertys
  });
};

/* get a property */
exports.getProperty = async (req, res) => {
  const property = await Property.findById(req.params.id).populate([
    {
      path: "creator",
      select: "name avatar"
    },
    {
      path: "tags",
      select: "title _id"
    }
  ]);

  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "ملک با موفقیت دریافت شد",
    data: property
  });
};

/* update property */
exports.updateProperty = async (req, res) => {
  let updatedproperty = req.body;
  await Property.findByIdAndUpdate(req.params.id, updatedproperty);
  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "ملک با موفقیت بروز شد"
  });
};

/* delete property */
exports.deleteProperty = async (req, res) => {
  const property = await Property.findByIdAndDelete(req.params.id);
  await remove(property.logo.public_id);

  await Product.updateMany(
    { property: req.params.id },
    { $unset: { property: "" } }
  );
  await User.findByIdAndUpdate(property.creator, {
    $unset: { property: "" }
  });

  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "ملک با موفقیت حذف شد"
  });
};
