/* internal import */
// const Property = require("../models/property.model");
const Property = require("../models/property.model");
const User = require("../models/user.model");
const remove = require("../utils/remove.util");
const Address = require("../models/address.model");
const Translation = require("../models/translation.model");
const translateFields = require("../utils/translateFields");
const { generateSlug, generateSeoFields } = require("../utils/seoUtils");
const { flattenDocumentsTranslations } = require("../utils/flattenTranslations");
const defaultDomain = process.env.NEXT_PUBLIC_CLIENT_URL;
const PropertyType = require("../models/propertyType.model");
const Amenity = require("../models/amenity.model");
const propEventSpace = require("../models/propEventSpace.model");
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
      propertyType,
      ourEventSpaces,
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
    const parsedEventSpaces =
      typeof ourEventSpaces === "string"
        ? JSON.parse(ourEventSpaces)
        : ourEventSpaces;

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
    const amenityProps = [];
    const eventSpaceProps = [];

    for (const amenity of parsedAmenities) {

      const amenityProp = await Amenity.create({
        hasAmenity: amenity.hasAmenity
      });
      amenityProps.push(amenityProp);

      try {
        const { title } = amenity;

        const translationsAmenity = await translateFields(
          { title },
          { stringFields: ["title"] }
        );

        const translationAmenityDocs = Object.entries(translationsAmenity).map(
          ([lang, { fields }]) => ({
            language: lang,
            refModel: "Amenity",
            refId: amenityProp._id,
            fields
          })
        );

        const savedTranslationsAmenity = await Translation.insertMany(
          translationAmenityDocs
        );

        const translationInfos = savedTranslationsAmenity.map((t) => ({
          translation: t._id,
          language: t.language
        }));

        await Amenity.findByIdAndUpdate(amenityProp._id, {
          $set: { translations: translationInfos }
        });
      } catch (translationError) {
        await Amenity.findByIdAndDelete(amenityProp._id);
        return res.status(500).json({
          acknowledgement: false,
          message: "Translation Save Error",
          description: "خطا در ذخیره ترجمه‌ها. ویژگی حذف شد.",
          error: translationError.message
        });
      }
    }

    for (const space of parsedEventSpaces) {
      const eventSpaceProp = await propEventSpace.create({
        square: space.square
      });
      eventSpaceProps.push(eventSpaceProp);
      try {
        const { name, intro, description } = space;

        const translationsEventSpace = await translateFields(
          { name, intro, description },
          {
            stringFields: ["title", "intro", "description"]
          }
        );

        const translationEventSpaceDocs = Object.entries(
          translationsEventSpace
        ).map(([lang, { fields }]) => ({
          language: lang,
          refModel: "PropEventSpace",
          refId: eventSpaceProp._id,
          fields
        }));

        const savedTranslations = await Translation.insertMany(
          translationEventSpaceDocs
        );

        const translationInfos = savedTranslations.map((t) => ({
          translation: t._id,
          language: t.language
        }));

        await propEventSpace.findByIdAndUpdate(eventSpaceProp._id, {
          $set: { translations: translationInfos }
        });
      } catch (translationError) {
        await propEventSpace.findByIdAndDelete(eventSpaceProp._id);
        return res.status(500).json({
          acknowledgement: false,
          message: "Translation Save Error",
          description: "خطا در ذخیره ترجمه‌ها. فضای رویداد حذف شد.",
          error: translationError.message
        });
      }
    }
    const result = await Property.create({
      ...otherInformation,
      creator: req.admin._id,
      thumbnail,
      gallery,
      tags: parsedTags,
      unit: unitNum,
      building: buildingNum,
      socialLinks: parsedSocialLinks,
      features: parsedFeatures,
      location: parsedLocation,
      variants: parsedVariants,
      address: addressProp._id,
      type: propertyType,
      amenities: amenityProps.map((amenity) => amenity._id),
      eventSpaces: eventSpaceProps.map((space) => space._id)
    });
    const slug = await generateSlug(title);
    const { metaTitle, metaDescription } = generateSeoFields({
      title,
      summary,
      categoryTitle: await PropertyType.findById(propertyType).title
    });
    const canonicalUrl = `${defaultDomain}/property/${slug}`;
    try {
      const translations = await translateFields(
        {
          title,
          summary,
          description,
          metaTitle,
          metaDescription,
          parsedFeatures,
          canonicalUrl,
          slug,
          features: parsedFeatures
        },
        {
          stringFields: [
            "title",
            "summary",
            "description",
            "metaTitle",
            "metaDescription",
            "canonicalUrl",
            "slug"
          ],
          arrayObjectFields: ["features"]
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
        translation: t._id,
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
      select: "name avatar" 
    },
    {
      path: "tags",
      select: "title _id" 
    }
  ]);

  // Flatten translations for the property document
  const result = flattenDocumentTranslations(property, req.locale);

  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "ملک با موفقیت دریافت شد",
    data: result
  });
};

/* get all propertys */
exports.getProperties = async (req, res) => {
  const properties = await Property.find()
    .select(
      "propertyId _id creator tags type address unit building variants propertyType citizenshipStatus saleType thumbnail price currency isFeatured createdAt square bedrooms bathrooms createDate"
    )
    .sort({ createdAt: -1 })
    .populate([
      {
        path: "translations.translation",
        match: { language: req.locale },
        select: "fields.title fields.summary fields.slug language"
      },
      {
        path: "creator",
        select: "name avatar"
      },
      {
        path: "currency",
        select: "title code symbol"
      },
      {
        path: "saleType",
        populate: {
          path: "translations.translation",
          match: { language: req.locale },
          select: "fields.title  language"
        },
        select: "translations "
      },
      {
        path: "tradeType",
        populate: {
          path: "translations.translation",
          match: { language: req.locale },
          select: "fields.title  language"
        },
        select: "fields.title  language"
      },
      {
        path: "type",
        populate: {
          path: "translations.translation",
          match: { language: req.locale },
          select: "fields.title  language"
        },
        select: "fields.title  language"
      },
      {
        path: "category",
        select: "title"
      },
      {
        path: "address",
        select: "country state city "
      }
    ]);

  // Flatten translations for all property documents
  const result = flattenDocumentsTranslations(properties, req.locale);

  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "واحد ها با موفقیت دریافت شدند",
    data: result
  });
};

/* get a property */
exports.getProperty = async (req, res) => {
  try {
    const propertyId = parseInt(req.params.id, 10);

    const property = await Property.findOne({propertyId}).populate([
      {
        path: "translations.translation",
        match: { language: req.locale }
      },
      {
        path: "creator",
        select: "name avatar"
      },
      {
        path: "tags",
        select: "title _id"
      },
      {
        path: "currency",
        select: "title code symbol"
      },
      {
        path: "saleType",
        populate: {
          path: "translations.translation",
          match: { language: req.locale },
          select: "fields.title language"
        },
        select: "translations"
      },
      {
        path: "tradeType",
        populate: {
          path: "translations.translation",
          match: { language: req.locale },
          select: "fields.title language"
        },
        select: "translations"
      },
      {
        path: "type",
        populate: {
          path: "translations.translation",
          match: { language: req.locale },
          select: "fields.title language"
        },
        select: "translations"
      },
      {
        path: "category",
        select: "title _id"
      },
      {
        path: "address",
        select: "country state city street"
      },
      {
        path: "amenities",
        populate: {
          path: "translations.translation",
          match: { language: req.locale }
        }
      },
      {
        path: "eventSpaces",
        populate: {
          path: "translations.translation",
          match: { language: req.locale }
        }
      }
    ]);
    
    // Flatten translations for the property document
    const result = flattenDocumentTranslations(property, req.locale);

    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "ملک با موفقیت دریافت شد",
      data: result
    });
  } catch (error) {
    console.error("خطا در دریافت ملک:", error);
    res.status(500).json({
      acknowledgement: false,
      message: "Internal Server Error",
      description: "خطا در دریافت اطلاعات ملک",
      error: error.message
    });
  }
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
