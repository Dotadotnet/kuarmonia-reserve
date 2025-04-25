const PropType = require("../models/propertyType.model");
const remove = require("../utils/remove.util");
const Translation = require("../models/translation.model");
const { translate } = require("google-translate-api-x");

/* add new propType */
exports.addPropType = async (req, res) => {
  try {
    const { title, description, amenities } = req.body;
    const parsedAmenities = JSON.parse(amenities);
    console.log("Parsed Amenities:", parsedAmenities);
    let translatedTitleEn = "";
    let translatedDescriptionEn = "";
    let translatedAmenitiesEn = [];

    let translatedTitleTr = "";
    let translatedDescriptionTr = "";
    let translatedAmenitiesTr = [];


    try {
      console.log("Translating to English...");
      translatedTitleEn = (
        await translate(title, { to: "en", client: "gtx" })
      ).text;
      translatedDescriptionEn = (
        await translate(description, { to: "en", client: "gtx" })
      ).text;
      translatedAmenitiesEn = await Promise.all(
        parsedAmenities.map((k) =>
          translate(k, { to: "en", client: "gtx" }).then((res) => res.text)
        )
      );

      console.log("Translating to Turkish...");
      translatedTitleTr = (
        await translate(title, { to: "tr", client: "gtx" })
      ).text;
      translatedDescriptionTr = (
        await translate(description, { to: "tr", client: "gtx" })
      ).text;
      translatedAmenitiesTr = await Promise.all(
        parsedAmenities.map((k) =>
          translate(k, { to: "tr", client: "gtx" }).then((res) => res.text)
        )
      );
    
    } catch (err) {
      console.error("خطا در ترجمه:", err.message);
      return res.status(500).json({
        acknowledgement: false,
        message: "Error",
        description: "خطا در ترجمه",
        error: err.message
      });
    }
    const propType = new PropType({
      title: title,
      description: description,
      amenities: parsedAmenities,
      creator: req.admin._id
    });

    const result = await propType.save();
    const translationData = [
      {
        language: "en",
        refModel: "PropertyType",
        refId: result._id,
        fields: {
          title: translatedTitleEn,
          description: translatedDescriptionEn,
          amenities: translatedAmenitiesEn
        }
      },
      {
        language: "tr",
        refModel: "PropertyType",
        refId: result._id,
        fields: {
          title: translatedTitleTr,
          description: translatedDescriptionTr,
          amenities: translatedAmenitiesTr
        }
      }
    ];
    try {
      await Translation.insertMany(translationData);
    } catch (translationError) {
      await PropType.findByIdAndDelete(result._id);
      return res.status(500).json({
        acknowledgement: false,
        message: "Translation Save Error",
        description: "خطا در ذخیره ترجمه‌ها. نوع ملک حذف شد.",
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
exports.getPropTypes = async (res) => {
  const propTypes = await PropType.find({ isDeleted: { $ne: true } }).populate({
    path: "creator",
    select: "name avatar"
  });
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
