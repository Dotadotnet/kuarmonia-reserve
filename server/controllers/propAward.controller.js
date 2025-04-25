
/* internal import */
const propAwardService = require("../services/propAward.service");

/* add new propAward */
exports.addPropAward = async (req, res, next) => {
  try {
    await propAwardService.addPropAward(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* get all propAwards */
exports.getPropAwards = async (req, res, next) => {
  try {
    await propAwardService.getPropAwards(res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* get a propAward */
exports.getPropAward = async (req, res, next) => {
  try {
    await propAwardService.getPropAward(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* update propAward */
exports.updatePropAward = async (req, res, next) => {
  try {
    await propAwardService.updatePropAward(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* delete propAward */
exports.deletePropAward = async (req, res, next) => {
  try {
    await propAwardService.deletePropAward(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};
