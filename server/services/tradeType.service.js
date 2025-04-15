const TradeType = require("../models/tradeType.model");
const Admin = require("../models/admin.model");
const remove = require("../utils/remove.util");

/* add new tradeType */
exports.addTradeType = async (req, res) => {
  try {
    const { body } = req;
    console.log(body.priceFields)
    const tradeType = new TradeType({
      title: body.title,
      description: body.description,
      priceFields:  JSON.parse(body.priceFields),
      creator: req.admin._id,
    });

    const result = await tradeType.save();

    await Admin.findByIdAndUpdate(result.creator, {
      $set: {
        tradeType: result._id
      }
    });

    res.status(201).json({
      acknowledgement: true,
      message: "Created",
      description: "نوع معاملات با موفقیت ایجاد شد"
    });
  } catch (error) {
    console.error("Error in addTradeType:", error);
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطا در ایجاد نوع معاملات",
      error: error.message
    });
  }
};

/* get all tradeTypes */
exports.getTradeTypes = async (res) => {
  const tradeTypes = await TradeType.find({ isDeleted: { $ne: true } }).populate(
    {
      path: "creator",
      select: "name avatar"
    }
  );
  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "نوع معاملات ها با موفقیت دریافت شدند",
    data: tradeTypes
  });
};

exports.getProductTradeTypes = async (res) => {
  const tradeTypes = await TradeType.find().populate({
    path: "products",
    match: { isDeleted: false, status: "active", publishStatus: "approved" },
    select: "_id"
  });
  const filteredTradeTypes = tradeTypes.filter(
    (tradeType) => tradeType.products.length > 0
  );

  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "نوع معاملات ها با موفقیت دریافت شدند",
    data: filteredTradeTypes
  });
};
/* get a tradeType */
exports.getTradeType = async (req, res) => {
  const tradeType = await TradeType.findById(req.params.id);
  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "نوع معاملات با موفقیت دریافت شد",
    data: tradeType
  });
};

/* update tradeType */
exports.updateTradeType = async (req, res) => {
  const tradeType = await TradeType.findById(req.params.id);
  let updatedTradeType = req.body;
  if (!req.body.thumbnail && req.file) {
    await remove(tradeType.thumbnail.public_id);

    updatedTradeType.thumbnail = {
      url: req.file.path,
      public_id: req.file.filename
    };
  }

  updatedTradeType.keynotes = JSON.parse(req.body.keynotes);
  updatedTradeType.tags = JSON.parse(req.body.tags);

  await TradeType.findByIdAndUpdate(req.params.id, updatedTradeType);

  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "TradeType updated successfully"
  });
};

/* delete tradeType */
exports.deleteTradeType = async (req, res) => {
  const tradeType = await TradeType.findByIdAndUpdate(
    req.params.id,
    {
      isDeleted: true,
      deletedAt: Date.now()
    },
    { new: true }
  );

  if (!tradeType) {
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
