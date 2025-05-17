

/* internal import */
const residencyStatusService = require("../services/residencyStatus.service");

/* add new residencyStatus */
exports.addResidencyStatus = async (req, res, next) => {
  try {
    await residencyStatusService.addResidencyStatus(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* get all residencyStatuss */
exports.getResidencyStatuss = async (req, res, next) => {
  try {
    await residencyStatusService.getResidencyStatuss(req,res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* get a residencyStatus */
exports.getResidencyStatus = async (req, res, next) => {
  try {
    await residencyStatusService.getResidencyStatus(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* update residencyStatus */
exports.updateResidencyStatus = async (req, res, next) => {
  try {
    await residencyStatusService.updateResidencyStatus(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* delete residencyStatus */
exports.deleteResidencyStatus = async (req, res, next) => {
  try {

    await residencyStatusService.deleteResidencyStatus(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};
