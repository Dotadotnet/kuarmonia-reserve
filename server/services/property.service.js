/* internal import */
// const Property = require("../models/property.model");
const Property = require("../models/property.model");
const User = require("../models/user.model");
const remove = require("../utils/remove.util");
const Address = require("../models/address.model");
const Translation = require("../models/translation.model");
const translateFields = require("../utils/translateFields");

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
      unit,
      building,
      ...otherInformation
    } = req.body;
    let thumbnail = null;
    let gallery = [];

    const parseAddress = JSON.parse(address);
    const parsedTags = JSON.parse(tags);
    const parsedFeatures = JSON.parse(features);
    const parsedSocialLinks = JSON.parse(socialLinks);
    const parsedAmenities = JSON.parse(amenities);
    const parsedLocation = JSON.parse(location);
    const parsedVariants = JSON.parse(variants);
    const parsedUnit = JSON.parse(unit);
    const parsedBuilding = JSON.parse(building);

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
    const addressProp = await Address.create({
      country: parseAddress.country,
      state: parseAddress.state,
      city: parseAddress.city,
      street: parseAddress.street,
      plateNumber: parseAddress.plateNumber,
      phone: parseAddress.phone,
      email: parseAddress.email,
      postalCode: parseAddress.postalCode
    });
    const unitNum = {
      square: Number(parsedUnit.square),
      bathrooms: Number(parsedUnit.bathrooms),
      bedrooms: Number(parsedUnit.bedrooms),
      floor: Number(parsedUnit.floor)
    };

    const buildingNum = {
      totalFloors: Number(parsedBuilding.totalFloors),
      totalUnits: Number(parsedBuilding.totalUnits),
      bedrooms: parsedBuilding.bedrooms.map((item) => Number(item)),
      square: parsedBuilding.square.map((item) => Number(item))
    };

    const result = await Property.create({
      ...otherInformation,
      creator: req.admin._id,
      thumbnail,
      gallery,
      tags: parsedTags,
      title,
      description,
      summary,
      unit: unitNum,
      building: buildingNum,
      socialLinks: parsedSocialLinks,
      features: parsedFeatures,
      amenities: parsedAmenities,
      location: parsedLocation,
      variants: parsedVariants,
      address: addressProp._id
    });
    const { metaTitle, metaDescription } = result;

    try {
      const translations = await translateFields(
        {
          title,
          summary,
          description,
          metaTitle,
          metaDescription,
          parsedFeatures
        },
        {
          stringFields: [
            "title",
            "summary",
            "description",
            "metaTitle",
            "metaDescription"
          ],
          arrayObjectFields: ["parsedFeatures"]
        }
      );
      const translationDocs = Object.entries(translations).map(
        ([lang, { fields }]) => ({
          language: lang,
          refModel: "Property",
          refId: result._id,
          fields
        })
      );
      const savedTranslations = await Translation.insertMany(translationDocs);
      const translationInfos = savedTranslations.map((t) => ({
        translationId: t._id,
        language: t.language
      }));
      await Property.findByIdAndUpdate(result._id, {
        $set: { translations: translationInfos }
      });
    } catch (translationError) {
      await Property.findByIdAndDelete(result._id);
      return res.status(500).json({
        acknowledgement: false,
        message: "Translation Save Error",
        description: "خطا در ذخیره ترجمه‌ها. پست بلاگ حذف شد.",
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
      message: error.message,
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
