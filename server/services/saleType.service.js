const SaleType = require("../models/saleType.model");
const Admin = require("../models/admin.model");
const remove = require("../utils/remove.util");

/* add new saleType */
exports.addSaleType = async (req, res) => {
  try {
    const { body } = req;
    const saleType = new SaleType({
      title: body.title,
      description: body.description,
      creator: req.admin._id,
    });

    const result = await saleType.save();

    await Admin.findByIdAndUpdate(result.creator, {
      $set: {
        saleType: result._id
      }
    });

    res.status(201).json({
      acknowledgement: true,
      message: "Created",
      description: "نوع معاملات با موفقیت ایجاد شد"
    });
  } catch (error) {
    console.error("Error in addSaleType:", error);
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطا در ایجاد نوع معاملات",
      error: error.message
    });
  }
};

/* get all saleTypes */
exports.getSaleTypes = async (res) => {
  const saleTypes = await SaleType.find({ isDeleted: { $ne: true } }).populate(
    {
      path: "creator",
      select: "name avatar"
    }
  );
  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "نوع معاملات ها با موفقیت دریافت شدند",
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
    description: "نوع معاملات ها با موفقیت دریافت شدند",
    data: filteredSaleTypes
  });
};
/* get a saleType */
exports.getSaleType = async (req, res) => {
  const saleType = await SaleType.findById(req.params.id);
  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "نوع معاملات با موفقیت دریافت شد",
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
      message: "نوع معاملات پیدا نشد",
      description: "نوع معاملات  که می‌خواهید حذف کنید، وجود ندارد"
    });
  }

  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "نوع معاملات با موفقیت حذف شد"
  });
};
