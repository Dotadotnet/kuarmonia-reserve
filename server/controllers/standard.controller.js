
/* internal import */
const standardService = require("../services/standard.service");

/* add new standard */
exports.addStandard = async (req, res, next) => {
  try {
    await standardService.addStandard(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* get all standards */
exports.getStandards = async (req, res, next) => {
  try {
    await standardService.getStandards(req,res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* get a standard */
exports.getStandard = async (req, res, next) => {
  try {
    await standardService.getStandard(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* update standard */
exports.updateStandard = async (req, res, next) => {
  try {
    await standardService.updateStandard(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* delete standard */
exports.deleteStandard = async (req, res, next) => {
  try {
    await standardService.deleteStandard(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};
