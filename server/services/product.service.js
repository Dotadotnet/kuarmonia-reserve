/* internal import */
const Product = require("../models/product.model");
const Category = require("../models/category.model");
const remove = require("../utils/remove.util");
const Review = require("../models/review.model");
const User = require("../models/user.model");
const Variation = require("../models/variation.model");

/* add new product */
exports.addProduct = async (req, res) => {
  const { features, campaign, variations, tags, ...otherInformation } =
    req.body;
  let thumbnail = null;
  let gallery = [];
  const parsedFeatures = JSON.parse(features);
  const parsedCampaign = JSON.parse(campaign);
  const parsedVariations = JSON.parse(variations);
  const parsedTags = JSON.parse(tags);

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

  const product = await Product.create({
    ...otherInformation,
    features: parsedFeatures,
    campaign: parsedCampaign,
    tags: parsedTags,
    creator: req.user._id,
    thumbnail,
    gallery
  });

  const variationDocs = await Promise.all(
    parsedVariations.map(async (variation) => {
      return await Variation.create({ ...variation, product: product._id });
    })
  );
  product.variations = variationDocs.map(v => v._id);
  await product.save();

  await Category.findByIdAndUpdate(product.category, {
    $push: { products: product._id }
  });

  res.status(201).json({
    acknowledgement: true,
    message: "Created",
    description: "محصول با موفقیت ایجاد شد"
  });
};

/* get all products */
exports.getProducts = async (res) => {
  const products = await Product.find({ isDeleted: false })
  .select("title thumbnail status summary productId _id createdAt creator")
  .populate("category", "title")
  .populate({
    path: "reviews",
    options: { sort: { updatedAt: -1 } },
    select: "reviewer"
  })
  .populate({
    path: "variations",
    select: "price stock unit lowStockThreshold",
    populate: {
      path: "unit",
      select: "title value" 
    }
  });
  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "دریافت محصولات با موفقیت انجام شد",
    data: products
  });
};

exports.getDetailsProducts = async (res) => {
  const products = await Product.find({
    isDeleted: false,
    publishStatus: "approved",
    status: "active"
  })
    .select(
      "title thumbnail status discountAmount summary productId _id createdAt creator campaign gallery variations"
    )
    .populate("category", "title")
    .populate({
      path: "reviews",
      options: { sort: { updatedAt: -1 } },
      populate: [
        "reviewer",
        {
          path: "product",
          populate: ["category"]
        }
      ]
    })
    .populate({
      path: "variations",
      select: "price unit ",
      populate: {
        path: "unit",
        select: "title value" // فیلدهای مورد نظر از واحد
      }
    });
  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "دریافت محصولات با موفقیت انجام شد",
    data: products
  });
};

/* get a single product */
exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate("category")
      .populate({
        path: "reviews",
        options: { sort: { updatedAt: -1 } },
        populate: [
          "reviewer",
          {
            path: "product",
            populate: ["category"]
          }
        ]
      })
      .populate({
        path: "creator",
        select: "name avatar role" // دریافت نام و آواتار سازنده
      })
      .populate({
        path: "variations",
        select: "price stock unit lowStockThreshold",
        populate: {
          path: "unit",
          select: "title value description" // فیلدهای مورد نظر از واحد
        }
      })
      .populate({
        path: "tags",
        select: "title keynotes"
      });
    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "محصول با موفقیت دریافت شد",
      data: product
    });
  } catch (error) {
    res.status(500).json({
      acknowledgement: false,
      message: "خطایی رخ داد",
      description: error.message
    });
  }
};

// get cart proct
exports.getProductCart = async (req, res) => {
  try {

    const query = req.query.query;
    const parsedProducts = JSON.parse(query);
    const products = await Promise.all(
      parsedProducts.map(async (item) => {
        return await Product.findOne(
          { _id: item.product },
          { title: 1, thumbnail: 1, variations: { $elemMatch: { unit: item.unit } } }
        ).populate("variations.unit", "title")
        .lean(); 
      })
    );
    const filteredProducts = products.filter(product => product);

    const finalProducts = filteredProducts.map(product => ({
      _id: product._id,
      title: product.title,
      thumbnail: product.thumbnail,
      variations: product.variations.map(variation => ({
        unit: variation.unit?.title,
        price: variation.price
      }))
    }));
    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "محصولات با موفقیت دریافت شدند",
      data: finalProducts
    });
  } catch (error) {
    res.status(500).json({
      acknowledgement: false,
      message: "خطایی رخ داد",
      description: error.message
    });
  }
};

/* filtered products */
exports.getFilteredProducts = async (req, res) => {
  try {
    let filter = {
      isDeleted: false,
      publishStatus: "approved",
      status: "active"
    };

    if (req.query.category != "null") {
      filter.category = req.query.category;
    }

    const products = await Product.find(filter).populate(["category"]);

    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "محصولات با موفقیت دریافت شد",
      data: products
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      acknowledgement: false,
      message: "Internal Server Error",
      description: "Failed to fetch filtered products",
      error: error.message
    });
  }
};

/* update product */
exports.updateProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  const updatedProduct = req.body;

  if (!req.body.thumbnail && req.files && req.files.thumbnail?.length > 0) {
    remove(product.thumbnail.public_id);

    updatedProduct.thumbnail = {
      url: req.files.thumbnail[0].path,
      public_id: req.files.thumbnail[0].filename
    };
  }

  if (
    !req.body.gallery?.length > 0 &&
    req.files &&
    req.files.gallery?.length > 0
  ) {
    for (let i = 0; i < product.gallery.length; i++) {
      await remove(product.gallery[i].public_id);
    }

    updatedProduct.gallery = req.files.gallery.map((file) => ({
      url: file.path,
      public_id: file.filename
    }));
  }

  updatedProduct.features = JSON.parse(req.body.features);
  updatedProduct.campaign = JSON.parse(req.body.campaign);
  updatedProduct.variations = JSON.parse(req.body.variations);

  await Product.findByIdAndUpdate(req.params.id, { $set: updatedProduct });

  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "Product updated successfully"
  });
};

exports.updateApproveProduct = async (req, res) => {
  await Product.findByIdAndUpdate(req.params.id, {
    $set: { publishStatus: "approved" }
  });

  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "محصول با موفقت تایید و در صفحه اصلی سایت درج شد"
  });
};

exports.updateRejectProduct = async (req, res) => {
  const { rejectMessage } = req.body;
  if (!rejectMessage) {
    return res.status(400).json({
      acknowledgement: false,
      message: "پیام رد کردن الزامی است",
      description: "لطفا دلیل رد کردن محصول را وارد کنید"
    });
  }
  await Product.findByIdAndUpdate(req.params.id, {
    $set: { publishStatus: "reject", rejectMessage }
  });

  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "محصول با موفقت تاید و در صفحه اصلی سایت درج شد"
  });
};

exports.updateApproveProduct = async (req, res) => {
  await Product.findByIdAndUpdate(req.params.id, {
    $set: { publishStatus: "approved" }
  });

  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "محصول با موفقت تاید و در صفحه اصلی سایت درج شد"
  });
};

exports.updateStatusProduct = async (req, res) => {
  const findproduct = await Product.findById(req.params.id);
  if (!findproduct) {
    return res.status(404).json({
      acknowledgement: true,
      message: "محصول پیدا نشد",
      description: "محصول پیدا نشد"
    });
  }

  const newStatus = findproduct.status === "active" ? "inactive" : "active";
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    {
      status: newStatus,
      updatedAt: Date.now()
    },
    { new: true }
  );
  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "وضعیت محصول با موفقیت تغییر یافت"
  });
};

/* delete product */
exports.deleteProduct = async (req, res) => {
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    {
      isDeleted: true,
      deletedAt: Date.now()
    },
    { new: true }
  );

  if (!product) {
    return res.status(404).json({
      acknowledgement: false,
      message: "محصول پیدا نشد",
      description: "محصولی که می‌خواهید حذف کنید، وجود ندارد"
    });
  }

  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "مصحول با موفقیت حذف شد"
  });
};
