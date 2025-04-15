const PropType = require("../models/propertyType.model");
const Admin = require("../models/admin.model");
const remove = require("../utils/remove.util");

/* add new propType */
exports.addPropType = async (req, res) => {
  try {
    const { body } = req;
    const propType = new PropType({
      title: body.title,
      description: body.description,
      amenities: body.amenities,
      creator: req.admin._id,
    });

    const result = await propType.save();

    await Admin.findByIdAndUpdate(result.creator, {
      $set: {
        propType: result._id
      }
    });

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
  const propTypes = await PropType.find({ isDeleted: { $ne: true } }).populate(
    {
      path: "creator",
      select: "name avatar"
    }
  );
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

  updatedPropType.keynotes = JSON.parse(req.body.keynotes);
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
