const PropType = require("../models/propertyType.model");
const remove = require("../utils/remove.util");
const Translation = require("../models/translation.model");
const translateFields = require("../utils/translateFields");
const defaultDomain = process.env.NEXT_PUBLIC_CLIENT_URL;
const { generateSlug } = require("../utils/seoUtils");

/* add new propType */
exports.addPropType = async (req, res) => {
  try {
    const { title, description, amenities } = req.body;
    const parsedAmenities = JSON.parse(amenities);

    const propType = new PropType({
      title: title,
      description: description,
      amenities: parsedAmenities,
      creator: req.admin._id
    });

    const result = await propType.save();
    const slug = await generateSlug(title);
    const canonicalUrl = `${defaultDomain}/property/type/${slug}`;

    try {
      const translations = await translateFields(
        {
          title,
          description,
          amenities: parsedAmenities,
          canonicalUrl,
          slug
        },
        {
          stringFields: ["title", "description", "canonicalUrl", "slug"],
          arrayStringFields: ["amenities"]
        }
      );
      const translationDocs = Object.entries(translations).map(
        ([lang, { fields }]) => ({
          language: lang,
          refModel: "PropType",
          refId: result._id,
          fields
        })
      );
      const savedTranslations = await Translation.insertMany(translationDocs);
      const translationInfos = savedTranslations.map((t) => ({
        translation: t._id,
        language: t.language
      }));
      await PropType.findByIdAndUpdate(result._id, {
        $set: { translations: translationInfos }
      });
    } catch (translationError) {
      console.log(translationError.message);
      await PropType.findByIdAndDelete(result._id);
      return res.status(500).json({
        acknowledgement: false,
        message: "Translation Save Error",
        description: "خطا در ذخیره ترجمه‌ها نوع ملک حذف شد.",
        error: translationError.message
      });
    }

    res.status(201).json({
      acknowledgement: true,
      message: "Created",
      description: "نوع ملک با موفقیت ایجاد شد"
    });
  } catch (error) {
    console.error("Error in addPropType:", error);
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطا در ایجاد نوع ملک",
      error: error.message
    });
  }
};

/* get all propTypes */
exports.getPropTypes = async (req, res) => {
  const propTypes = await PropType.find({ isDeleted: { $ne: true } }).populate([
    {
      path: "translations.translation",
      match: { language: req.locale }
    },
    {
      path: "creator",
      select: "name avatar"
    }
  ]);
  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "نوع ملک ها با موفقیت دریافت شدند",
    data: propTypes
  });
};

exports.getProductPropTypes = async (res) => {
  const propTypes = await PropType.find().populate({
    path: "products",
    match: { isDeleted: false, status: "active", publishStatus: "approved" },
    select: "_id"
  });
  const filteredPropTypes = propTypes.filter(
    (propType) => propType.products.length > 0
  );

  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "نوع ملک ها با موفقیت دریافت شدند",
    data: filteredPropTypes
  });
};
/* get a propType */
exports.getPropType = async (req, res) => {
  const propType = await PropType.findById(req.params.id);
  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "نوع ملک با موفقیت دریافت شد",
    data: propType
  });
};

/* update propType */
exports.updatePropType = async (req, res) => {
  const propType = await PropType.findById(req.params.id);
  let updatedPropType = req.body;
  if (!req.body.thumbnail && req.file) {
    await remove(propType.thumbnail.public_id);

    updatedPropType.thumbnail = {
      url: req.file.path,
      public_id: req.file.filename
    };
  }

  updatedPropType.amenities = JSON.parse(req.body.amenities);
  updatedPropType.tags = JSON.parse(req.body.tags);

  await PropType.findByIdAndUpdate(req.params.id, updatedPropType);

  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "PropType updated successfully"
  });
};

/* delete propType */
exports.deletePropType = async (req, res) => {
  const propType = await PropType.findByIdAndUpdate(
    req.params.id,
    {
      isDeleted: true,
      deletedAt: Date.now()
    },
    { new: true }
  );

  if (!propType) {
    return res.status(404).json({
      acknowledgement: false,
      message: "نوع ملک پیدا نشد",
      description: "نوع ملک  که می‌خواهید حذف کنید، وجود ندارد"
    });
  }

  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "نوع ملک با موفقیت حذف شد"
  });
};
