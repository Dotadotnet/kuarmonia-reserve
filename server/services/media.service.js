

/* internal import */
// const Media = require("../models/media.model");
const Media = require("../models/media.model");
const User = require("../models/user.model");
const remove = require("../utils/remove.util");
const Category = require("../models/category.model");

/* add new media */
exports.addMedia = async (req, res) => {
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
  const media = await media.create({
    ...otherInformation,
    creator: req.user._id,
    thumbnail,
    gallery,  
    tags:parsedTags,
    socialLinks:parsedSocialLinks

  });
  await Category.findByIdAndUpdate(media.category, {
    $push: { medias: media._id },
  });


  res.status(201).json({
    acknowledgement: true,
    message: "Created",
    description: "پست  با موفقیت ایجاد شد",
  });
};





exports.getMediaById = async (req, res) => {
  const media = await Media.findOne({mediaId  : req.params.id}).populate([
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
    description: "media fetched successfully",
    data: media,
  });
};


/* get all medias */
exports.getMedias = async (res) => {

  const medias = await Media.find().populate([
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
    data: medias,
  });
};

/* get a media */
exports.getMedia = async (req, res) => {
  const media = await Media.findById(req.params.id).populate([
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
    description: "media fetched successfully",
    data: media,
  });
};

/* update media */
exports.updateMedia = async (req, res) => {
  let updatedmedia = req.body;
  await Media.findByIdAndUpdate(req.params.id, updatedmedia);
  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "media updated successfully",
  });
};

/* delete media */
exports.deleteMedia = async (req, res) => {
  const media = await Media.findByIdAndDelete(req.params.id);
  await remove(media.logo.public_id);

  await Product.updateMany({ media: req.params.id }, { $unset: { media: "" } });
  await User.findByIdAndUpdate(media.creator, {
    $unset: { media: "" },
  });

  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "media deleted successfully",
  });
};
