

/* internal import */

const Product = require("../models/product.model");
const remove = require("../utils/remove.util");





exports.get = async (req, res) => {
  const Model = require(`../models/${req.params.model}.model`);
  let json = `{"${req.params.key}": "${req.params.value}"}`;
  let query = JSON.parse(json);
  const data = await Model.findOne(query).populate([
    {
      path: "creator",
      select: "name avatar", // دریافت فقط name و avatar از creator
    },
    {
      path: "tags",
      select: "title _id", // دریافت فقط title و _id از tags
    },
  ]);
  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "Data fetched successfully",
    data: data,
  });
};

exports.update = async (req, res) => {
  const Model = require(`../models/${req.params.model}.model`);
  let select = JSON.parse(`{"${req.params.key}": "${req.params.value}"}`);
  let update = JSON.parse(`{"${req.params.field}": "${req.params.newvalue}"}`);
  await Model.updateMany(select , update);
  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "Data updated successfully",
  });
};

exports.delete = async (req, res) => {
  const Model = require(`../models/${req.params.model}.model`);
  let select = JSON.parse(`{"${req.params.key}": "${req.params.value}"}`);
  await  Model.deleteMany(select)
  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "Data deleted successfully",
  });
};
