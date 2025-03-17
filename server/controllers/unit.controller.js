
/* internal import */
const unitService = require("../services/unit.service");

/* add new unit */
exports.addUnit = async (req, res, next) => {
  try {
    await unitService.addUnit(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* get all units */
exports.getUnits = async (req, res, next) => {
  try {
    await unitService.getUnits(res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* get a unit */
exports.getUnit = async (req, res, next) => {
  try {
    await unitService.getUnit(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* update unit */
exports.updateUnit = async (req, res, next) => {
  try {
    await unitService.updateUnit(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* delete unit */
exports.deleteUnit = async (req, res, next) => {
  try {
    await unitService.deleteUnit(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};
