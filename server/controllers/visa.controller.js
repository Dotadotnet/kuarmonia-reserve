
/* internal import */
const visaService = require("../services/visa.service");

/* add new visa */
exports.addVisa = async (req, res, next) => {
  try {
    console.log("🚀 ~ file: visa.controller.js:11 ~ exports.addVisa= ~ req.file", req.file);
    await visaService.addVisa(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* get all visas */
exports.getVisas = async (req, res, next) => {
  try {
    await visaService.getVisas(req,res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* get a visa */
exports.getVisa = async (req, res, next) => {
  try {
    await visaService.getVisa(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* update visa */
exports.updateVisa = async (req, res, next) => {
  try {
    await visaService.updateVisa(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* delete visa */
exports.deleteVisa = async (req, res, next) => {
  try {
    await visaService.deleteVisa(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};
