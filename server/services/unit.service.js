

/* internal import */
const Unit = require("../models/unit.model");
const Product = require("../models/product.model");
const User = require("../models/user.model");
const remove = require("../utils/remove.util");

/* add new unit */
exports.addUnit = async (req, res) => {
  const { title,description,category,value} = req.body;
  console.log(req.body)
  const unit = new Unit({
    title: title,
    description: description,
    category:category,
    value: value,
    creator: req.user._id
  });

  const result = await unit.save();

  await User.findByIdAndUpdate(result.creator, {
    $set: { unit: result._id },
  });

  res.status(201).json({
    acknowledgement: true,
    message: "Created",
    description: "واحد  با موفقیت ایجاد شد",
  });
};

/* get all units */
exports.getUnits = async (res) => {

  const units = await Unit.find().populate([
    "creator",
  ]);

  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "واحد ها با موفقیت دریافت شدند",
    data: units,
  });
};

/* get a unit */
exports.getUnit = async (req, res) => {
  const unit = await Unit.findById(req.params.id);

  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "Unit fetched successfully",
    data: unit,
  });
};

/* update unit */
exports.updateUnit = async (req, res) => {
  let updatedUnit = req.body;
  console.log("updatedUnit",updatedUnit)
  console.log(req.params.id)
  await Unit.findByIdAndUpdate(req.params.id, updatedUnit);
  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "Unit updated successfully",
  });
};

/* delete unit */
exports.deleteUnit = async (req, res) => {
  const unit = await Unit.findByIdAndDelete(req.params.id);
  await remove(unit.logo.public_id);

  await Product.updateMany({ unit: req.params.id }, { $unset: { unit: "" } });
  await User.findByIdAndUpdate(unit.creator, {
    $unset: { unit: "" },
  });

  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "Unit deleted successfully",
  });
};
