

/* internal import */
// const Property = require("../models/property.model");
const Property = require("../models/property.model");
const User = require("../models/user.model");
const remove = require("../utils/remove.util");
const Category = require("../models/category.model");

/* add new property */
exports.addProperty = async (req, res) => {
  try {
    const { tags,features, socialLinks,amenities,location,variants  , ...otherInformation } = req.body;

    let thumbnail = null;
    let gallery = [];

    const parsedTags = JSON.parse(tags);
    const parsedFeatures = JSON.parse(features);
    const parsedSocialLinks = JSON.parse(socialLinks);
    const parsedAmenities = JSON.parse(amenities);
    const parsedLocation = JSON.parse(location);
    const parsedVariants = JSON.parse(variants );

    if (req.uploadedFiles["thumbnail"]?.length) {
      thumbnail = {
        url: req.uploadedFiles["thumbnail"][0].url,
        public_id: req.uploadedFiles["thumbnail"][0].key,
      };
    }

    if (req.uploadedFiles["gallery"]?.length > 0) {
      gallery = req.uploadedFiles["gallery"].map((file) => ({
        url: file.url,
        public_id: file.key,
      }));
    }

    const property = await Property.create({
      ...otherInformation,
      creator: req.admin._id,
      thumbnail,
      gallery,
      tags: parsedTags,
      socialLinks: parsedSocialLinks,
      features:parsedFeatures,
      amenities:parsedAmenities,
      location: parsedLocation,
      variants: parsedVariants,
    });

    await Category.findByIdAndUpdate(property.category, {
      $push: { propertys: property._id },
    });

    res.status(201).json({
      acknowledgement: true,
      message: "Created",
      description: "ملک با موفقیت ایجاد شد",
    });
  } catch (error) {
    console.error("❌ Error in addProperty:", error);
    res.status(500).json({
      acknowledgement: false,
      message: "ایجاد ملک با خطا مواجه شد",
      error: error?.message || "خطای ناشناخته",
    });
  }
};





exports.getPropertyById = async (req, res) => {
  const property = await Property.findOne({propertyId  : req.params.id}).populate([
    {
      path: "creator",
      select: "name avatar", // دریافت فقط name و avatar از creator
    },
    {
      path: "tags",
      select: "title _id", // دریافت فقط title و _id از tags
    },
  ]);
  
  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "ملک با موفقیت دریافت شد",
    data: property,
  });
};


/* get all propertys */
exports.getProperties = async (res) => {

  const propertys = await Property.find().populate([
    {
      path: 'creator',
      select: 'name avatar'  
    },
    {
      path: 'category',
      select: 'title'
    }
  ]);
  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "واحد ها با موفقیت دریافت شدند",
    data: propertys,
  });
};

/* get a property */
exports.getProperty = async (req, res) => {
  const property = await Property.findById(req.params.id).populate([
    {
      path: "creator",
      select: "name avatar", 
    },
    {
      path: "tags",
      select: "title _id",
    },
  ]);
  
  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "ملک با موفقیت دریافت شد",
    data: property,
  });
};

/* update property */
exports.updateProperty = async (req, res) => {
  let updatedproperty = req.body;
  await Property.findByIdAndUpdate(req.params.id, updatedproperty);
  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "ملک با موفقیت بروز شد",
  });
};

/* delete property */
exports.deleteProperty = async (req, res) => {
  const property = await Property.findByIdAndDelete(req.params.id);
  await remove(property.logo.public_id);

  await Product.updateMany({ property: req.params.id }, { $unset: { property: "" } });
  await User.findByIdAndUpdate(property.creator, {
    $unset: { property: "" },
  });

  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "ملک با موفقیت حذف شد",
  });
};
