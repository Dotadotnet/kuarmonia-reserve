/* internal import */
const Gallery = require("../models/gallery.model");
const Product = require("../models/product.model");
const User = require("../models/user.model");
const remove = require("../utils/remove.util");
const Translation = require("../models/translation.model");
const translateFields = require("../utils/translateFields");

/* add new gallery */
exports.addGallery = async (req, res) => {
  const { title, description } = req.body;
  let thumbnail = null;
  let gallery = [];

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

  if (req.uploadedFiles["gallery"] && req.uploadedFiles["gallery"].length > 0) {
    gallery = req.uploadedFiles["gallery"].map((file) => ({
      url: file.url,
      public_id: file.key
    }));
  }
  const result = await Gallery.create({
    creator: req.admin._id,
    thumbnail,
    title,
    description,
    gallery
  });

  const translationDocs = Object.entries(translations).map(
    ([lang, { fields }]) => ({
      language: lang,
      refModel: "Gallery",
      refId: result._id,
      fields
    })
  );
  try {
    await Translation.insertMany(translationDocs);
  } catch (translationError) {
    await Gallery.findByIdAndDelete(result._id);
    return res.status(500).json({
      acknowledgement: false,
      message: "Translation Save Error",
      description: "خطا در ذخیره ترجمه‌ها. گالری حذف شد.",
      error: translationError.message
    });
  }
  res.status(201).json({
    acknowledgement: true,
    message: "Created",
    description: "گالری  با موفقیت ایجاد شد"
  });
};

/* get all gallerys */
exports.getGalleries = async (res) => {
  const galleries = await Gallery.find()
    .select("title description  thumbnail creator createdAt")
    .populate([
      {
        path: "creator",
        select: "name avatar"
      }
    ]);
  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "گالری ها با موفقیت دریافت شدند",
    data: galleries
  });
};

/* get a gallery */
exports.getGallery = async (req, res) => {
  const gallery = await Gallery.findById(req.params.id);

  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "گالری با موفقیت دریافت شد",
    data: gallery
  });
};

exports.getFirstGallery = async (req, res) => {
  const galleries = await Gallery.find().select("_id title");
  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "شناسه ها با موفقیت دریافت شدند",
    data: galleries
  });
};

/* update gallery */
exports.updateGallery = async (req, res) => {
  let updatedGallery = req.body;
  await Gallery.findByIdAndUpdate(req.params.id, updatedGallery);
  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "Gallery updated successfully"
  });
};

/* delete gallery */
exports.deleteGallery = async (req, res) => {
  const gallery = await Gallery.findByIdAndDelete(req.params.id);
  await remove(gallery.logo.public_id);

  await Product.updateMany(
    { gallery: req.params.id },
    { $unset: { gallery: "" } }
  );
  await User.findByIdAndUpdate(gallery.creator, {
    $unset: { gallery: "" }
  });

  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "Gallery deleted successfully"
  });
};
