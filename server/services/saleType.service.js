const SaleType = require("../models/saleType.model");
const remove = require("../utils/remove.util");
const Translation = require("../models/translation.model");
const translateFields = require("../utils/translateFields");
const defaultDomain = process.env.NEXT_PUBLIC_CLIENT_URL;
const { generateSlug } = require("../utils/seoUtils");

exports.addSaleType = async (req, res) => {
  try {
    const { title, description } = req.body;
   
    const saleType = new SaleType({
      creator: req.admin._id
    });

    const result = await saleType.save();
      const slug = await generateSlug(title);
      const canonicalUrl = `${defaultDomain}/property/saletype/${slug}`;

    try {
      const translations = await translateFields(
        {
          title,
          description,
          canonicalUrl,
          slug
        },
        {
          stringFields: ["title",  "description","canonicalUrl","slug"],
        }
      );
      const translationDocs = Object.entries(translations).map(
        ([lang, { fields }]) => ({
          language: lang,
          refModel: "SaleType",
          refId: result._id,
          fields
        })
      );
      const savedTranslations = await Translation.insertMany(translationDocs);
      const translationInfos = savedTranslations.map((t) => ({
        translation: t._id,
        language: t.language
      })); 
      await SaleType.findByIdAndUpdate(result._id, {
        $set: { translations: translationInfos }
      });
    } catch (translationError) {
      await SaleType.findByIdAndDelete(result._id);
      return res.status(500).json({
        acknowledgement: false,
        message: "Translation Save Error",
        description: "خطا در ذخیره ترجمه‌ها. نوع فروش حذف شد.",
        error: translationError.message
      });
    }

    res.status(201).json({
      acknowledgement: true,
      message: "Created",
      description: "نوع فروش با موفقیت ایجاد شد"
    });
  } catch (error) {
    console.error("Error in addSaleType:", error);
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: error.message,
      error: error.message
    });
  }
};

/* get all saleTypes */
exports.getSaleTypes = async (req,res) => {
  
  const saleTypes = await SaleType.find({ isDeleted: { $ne: true } }).populate([
    {
      path: "translations.translation",
      match: { language: req.locale }
    },
    {
      path: "creator",
      select: "name avatar"
    }]);
  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "نوع فروش ها با موفقیت دریافت شدند",
    data: saleTypes
  });
};

exports.getProductSaleTypes = async (res) => {
  const saleTypes = await SaleType.find().populate({
    path: "products",
    match: { isDeleted: false, status: "active", publishStatus: "approved" },
    select: "_id"
  });
  const filteredSaleTypes = saleTypes.filter(
    (saleType) => saleType.products.length > 0
  );

  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "نوع فروش ها با موفقیت دریافت شدند",
    data: filteredSaleTypes
  });
};
/* get a saleType */
exports.getSaleType = async (req, res) => {
  const saleType = await SaleType.findById(req.params.id);
  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "نوع فروش با موفقیت دریافت شد",
    data: saleType
  });
};

/* update saleType */
exports.updateSaleType = async (req, res) => {
  const saleType = await SaleType.findById(req.params.id);
  let updatedSaleType = req.body;
  if (!req.body.thumbnail && req.file) {
    await remove(saleType.thumbnail.public_id);

    updatedSaleType.thumbnail = {
      url: req.file.path,
      public_id: req.file.filename
    };
  }

  updatedSaleType.keynotes = JSON.parse(req.body.keynotes);
  updatedSaleType.tags = JSON.parse(req.body.tags);

  await SaleType.findByIdAndUpdate(req.params.id, updatedSaleType);

  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "SaleType updated successfully"
  });
};

/* delete saleType */
exports.deleteSaleType = async (req, res) => {
  const saleType = await SaleType.findByIdAndUpdate(
    req.params.id,
    {
      isDeleted: true,
      deletedAt: Date.now()
    },
    { new: true }
  );

  if (!saleType) {
    return res.status(404).json({
      acknowledgement: false,
      message: "نوع فروش پیدا نشد",
      description: "نوع فروش  که می‌خواهید حذف کنید، وجود ندارد"
    });
  }

  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "نوع فروش با موفقیت حذف شد"
  });
};
