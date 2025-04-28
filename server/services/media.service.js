/* internal import */
// const Media = require("../models/media.model");
const Media = require("../models/media.model");
const User = require("../models/user.model");
const remove = require("../utils/remove.util");
const Category = require("../models/category.model");
const Translation = require("../models/translation.model");
const translateFields = require("../utils/translateFields");

/* add new media */
exports.addMedia = async (req, res) => {
  try {
    const { tags, title, description, socialLinks, ...otherInformation } =
      req.body;
    let thumbnail = null;
    let gallery = [];
    const parsedTags = JSON.parse(tags);
    const parsedSocialLinks = JSON.parse(socialLinks);
    let translations;
    try {
      translations = await translateFields({ title, description }, [
        "title",
        "description"
      ]);
    } catch (err) {
      console.error("خطا در ترجمه:", err.message);
      return res.status(500).json({
        acknowledgement: false,
        message: "Error",
        description: "خطا در ترجمه",
        error: err.message
      });
    }
    if (req.uploadedFiles["thumbnail"].length) {
      thumbnail = {
        url: req.uploadedFiles["thumbnail"][0].url,
        public_id: req.uploadedFiles["thumbnail"][0].key
      };
    }

    if (
      req.uploadedFiles["gallery"] &&
      req.uploadedFiles["gallery"].length > 0
    ) {
      gallery = req.uploadedFiles["gallery"].map((file) => ({
        url: file.url,
        public_id: file.key
      }));
    }
    const media = await media.create({
      ...otherInformation,
      creator: req.user._id,
      thumbnail,
      gallery,
      tags: parsedTags,
      socialLinks: parsedSocialLinks
    });
    const translationDocs = Object.entries(translations).map(
      ([lang, { fields }]) => ({
        language: lang,
        refModel: "Media",
        refId: result._id,
        fields
      })
    );
    let insertedTranslations;
    try {
      insertedTranslations = await Translation.insertMany(translationDocs);

      const translationIds = insertedTranslations.map((t) => t._id);

      await Media.findByIdAndUpdate(result._id, {
        $set: { translations: translationIds }
      });

      return res.status(201).json({
        acknowledgement: true,
        message: "Created",
        description: "دسته‌بندی با موفقیت ایجاد و ترجمه شد.",
        data: result
      });
    } catch (translationError) {
      await Media.findByIdAndDelete(result._id);
      return res.status(500).json({
        acknowledgement: false,
        message: "Translation Save Error",
        description: "خطا در ذخیره ترجمه‌ها. دسته‌بندی حذف شد.",
        error: translationError.message
      });
    }
  } catch (error) {
    console.error("Error in addMedia:", error);
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: error.message,
      error: error.message
    });
  }
};

exports.getMediaById = async (req, res) => {
  const media = await Media.findOne({ mediaId: req.params.id }).populate([
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
    description: "media fetched successfully",
    data: media
  });
};

/* get all medias */
exports.getMedias = async (res) => {
  const medias = await Media.find().populate([
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
    data: medias
  });
};

/* get a media */
exports.getMedia = async (req, res) => {
  const media = await Media.findById(req.params.id).populate([
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
    description: "media fetched successfully",
    data: media
  });
};

/* update media */
exports.updateMedia = async (req, res) => {
  let updatedmedia = req.body;
  await Media.findByIdAndUpdate(req.params.id, updatedmedia);
  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "media updated successfully"
  });
};

/* delete media */
exports.deleteMedia = async (req, res) => {
  const media = await Media.findByIdAndDelete(req.params.id);
  await remove(media.logo.public_id);

  await Product.updateMany({ media: req.params.id }, { $unset: { media: "" } });
  await User.findByIdAndUpdate(media.creator, {
    $unset: { media: "" }
  });

  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "media deleted successfully"
  });
};
