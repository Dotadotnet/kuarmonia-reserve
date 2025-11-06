

/* internal import */
const Icon = require("../models/icon.model");
const Product = require("../models/product.model");
const User = require("../models/user.model");
const remove = require("../utils/remove.util");

/* add new icon */
exports.addIcon = async (req, res) => {
  try {
    const { title, symbol } = req.body;

    if (!title || !symbol) {
      return res.status(400).json({
        acknowledgement: false,
        message: "Bad Request",
        description: "عنوان و نماد الزامی هستند",
      });
    }

    const icon = new Icon({
      title,
      symbol,
      creator: req.admin._id,
    });

    const result = await icon.save();

    await User.findByIdAndUpdate(result.creator, {
      $set: { icon: result._id },
    });

    return res.status(201).json({
      acknowledgement: true,
      message: "Created",
      description: "نماد با موفقیت ایجاد شد",
      data: result,
    });
  } catch (error) {
    console.error("Error in addIcon:", error);
    return res.status(500).json({
      acknowledgement: false,
      message: "Internal Server Error",
      description: error.message || "مشکلی در ایجاد نماد پیش آمد",
    });
  }
};
;

/* get all icons */
exports.getIcons = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "" } = req.query;

    const pageNum = parseInt(page) || 1;
    const limitNum = parseInt(limit) || 10;
    const skip = (pageNum - 1) * limitNum;

    const query = {};
    if (search) {
      query.title = { $regex: search, $options: "i" }; // سرچ بر اساس عنوان
    }

    const icons = await Icon.find(query)
      .skip(skip)
      .limit(limitNum)
      .sort({ createdAt: -1 })
      .populate({
        path: "creator",
        select: "name avatar"
      });

    const total = await Icon.countDocuments(query);

    return res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "نمادها با موفقیت دریافت شدند",
      data: icons,
      total,
     
    });
  } catch (error) {
    console.error("Error in getIcons:", error);
    return res.status(500).json({
      acknowledgement: false,
      message: "خطا در دریافت نمادها",
      description: error.message || error.toString()
    });
  }
};

/* get a icon */
exports.getIcon = async (req, res) => {
  const icon = await Icon.findById(req.params.id);

  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "Icon fetched successfully",
    data: icon,
  });
};

/* update icon */
exports.updateIcon = async (req, res) => {
  let updatedIcon = req.body;
  await Icon.findByIdAndUpdate(req.params.id, updatedIcon);
  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "Icon updated successfully",
  });
};

/* delete icon */
exports.deleteIcon = async (req, res) => {
  const icon = await Icon.findByIdAndDelete(req.params.id);
  await remove(icon.logo.public_id);

  await Product.updateMany({ icon: req.params.id }, { $unset: { icon: "" } });
  await User.findByIdAndUpdate(icon.creator, {
    $unset: { icon: "" },
  });

  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "Icon deleted successfully",
  });
};
