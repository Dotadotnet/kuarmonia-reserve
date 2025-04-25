
/* internal import */
const propStandardService = require("../services/propStandard.service");

/* add new propStandard */
exports.addPropStandard = async (req, res, next) => {
  try {
    await propStandardService.addPropStandard(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* get all propStandards */
exports.getPropStandards = async (req, res, next) => {
  try {
    await propStandardService.getPropStandards(res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* get a propStandard */
exports.getPropStandard = async (req, res, next) => {
  try {
    await propStandardService.getPropStandard(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* update propStandard */
exports.updatePropStandard = async (req, res, next) => {
  try {
    await propStandardService.updatePropStandard(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* delete propStandard */
exports.deletePropStandard = async (req, res, next) => {
  try {
    await propStandardService.deletePropStandard(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};
