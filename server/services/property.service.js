

/* internal import */
// const Property = require("../models/property.model");
const Property = require("../models/property.model");
const User = require("../models/user.model");
const remove = require("../utils/remove.util");
const Category = require("../models/category.model");

/* add new property */
exports.addProperty = async (req, res) => {
  const {tags,socialLinks,...otherInformation} = req.body;
  let thumbnail = null;
  let gallery = [];
  const parsedTags = JSON.parse(tags);
  const parsedSocialLinks = JSON.parse(socialLinks);
  if (req.uploadedFiles["thumbnail"].length) {
    thumbnail = {
      url: req.uploadedFiles["thumbnail"][0].url,
      public_id: req.uploadedFiles["thumbnail"][0].key,
    };
  }

  if (req.uploadedFiles["gallery"] && req.uploadedFiles["gallery"].length > 0) {
    gallery = req.uploadedFiles["gallery"].map((file) => ({
      url: file.url,
      public_id: file.key,
    }));
  }
  const property = await property.create({
    ...otherInformation,
    creator: req.user._id,
    thumbnail,
    gallery,  
    tags:parsedTags,
    socialLinks:parsedSocialLinks

  });
  await Category.findByIdAndUpdate(property.category, {
    $push: { propertys: property._id },
  });


  res.status(201).json({
    acknowledgement: true,
    message: "Created",
    description: "پست  با موفقیت ایجاد شد",
  });
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
    description: "property fetched successfully",
    data: property,
  });
};


/* get all propertys */
exports.getPropertys = async (res) => {

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
    description: "property fetched successfully",
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
    description: "property updated successfully",
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
    description: "property deleted successfully",
  });
};
