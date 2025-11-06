
/* internal import */
const visaTypeService = require("../services/visaType.service");

/* add new visaType */
exports.addVisaType = async (req, res, next) => {
  try {
    console.log("🚀 ~ file: visaType.controller.js:11 ~ exports.addVisaType= ~ req.file", req.file);
    await visaTypeService.addVisaType(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* get all visaTypes */
exports.getVisaTypes = async (req, res, next) => {
  try {
    await visaTypeService.getVisaTypes(req,res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* get a visaType */
exports.getVisaType = async (req, res, next) => {
  try {
    await visaTypeService.getVisaType(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* get a visaType by visaTypeId */
exports.getVisaTypeById = async (req, res, next) => {
  try {
    console.log("🚀 ~ file: visaType.controller.js:42 ~ exports.getVisaTypeById= ~ req.params", req.params)
    await visaTypeService.getVisaTypeById(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};


/* update visaType */
exports.updateVisaType = async (req, res, next) => {
  try {
    await visaTypeService.updateVisaType(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* delete visaType */
exports.deleteVisaType = async (req, res, next) => {
  try {
    await visaTypeService.deleteVisaType(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};
