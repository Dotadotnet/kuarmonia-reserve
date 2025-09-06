const Product = require("../models/product.model");
const remove = require("../utils/remove.util");
const dynamicImportModel = require("../utils/dynamicImportModel")
const replaceRef = require("../utils/replaceRef")
const autoTranslation = require("../utils/autoTranslation")



function concatParams(keysString, valuesString) {
  const keys = keysString.split(',')
  const values = valuesString.split(",")
  const result = {};
  for (let i = 0; i < keys.length; i++) {
    result[keys[i]] = values[i];
  }
  return result;
}

async function replaceDataDynamic(data, req) {
  const replaceRefClass = new replaceRef(data, req);
  const replaceRefData = await replaceRefClass.getRefFields()
  return replaceRefData;
}

exports.get = async (req, res) => {
  const Model = dynamicImportModel(req.params.model);
  let query = concatParams(req.params.key, req.params.value);
  const data = await Model.find(query).lean();
  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "Data fetched successfully",
    data: await replaceDataDynamic(data, req)
  });
};

exports.getOne = async (req, res) => {
  const Model = dynamicImportModel(req.params.model);
  let query = concatParams(req.params.key, req.params.value);
  const data = await Model.findOne(query).lean();
  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "Data fetched successfully",
    data: await replaceDataDynamic(data, req)
  });
};

exports.getByID = async (req, res) => {
  const Model = dynamicImportModel(req.params.model);
  const data = await Model.findById(req.params.id).lean();
  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "Data fetched successfully",
    data: await replaceDataDynamic(data, req)
  });
};

exports.getAll = async (req, res) => {
  const Model = dynamicImportModel(req.params.model);
  const data = await Model.find().lean();
  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "Data fetched successfully",
    data: await replaceDataDynamic(data, req)
  });
};

exports.update = async (req, res) => {
  const Model = dynamicImportModel(req.params.model);
  let select = JSON.parse(`{"${req.params.key}": "${req.params.value}"}`);
  let update = JSON.parse(`{"${req.params.field}": "${req.params.newvalue}"}`);
  await Model.updateMany(select, update);
  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "Data updated successfully",
  });
};

exports.delete = async (req, res) => {
  const Model = dynamicImportModel(req.params.model);
  let select = JSON.parse(`{"${req.params.key}": "${req.params.value}"}`);
  await Model.deleteMany(select)
  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "Data deleted successfully",
  });
};


exports.count = async (req, res) => {
  const Model = dynamicImportModel(req.params.model);
  let query = concatParams(req.params.key, req.params.value);
  const data = await Model.countDocuments(query);
  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "Data fetched successfully",
    data: data
  });
};

exports.countAll = async (req, res) => {
  const Model = dynamicImportModel(req.params.model);
  const data = await Model.countDocuments();
  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "Data fetched successfully",
    data: data
  });
};
