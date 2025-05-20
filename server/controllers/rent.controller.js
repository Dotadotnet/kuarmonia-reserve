
/* internal import */
const rentService = require("../services/rent.service");

/* add new rent */
exports.addRent = async (req, res, next) => {
  try {
    await rentService.addRent(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* get all rents */
exports.getRents = async (req, res, next) => {
  try {
    await rentService.getRents(req,res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* get a rent */
exports.getRent = async (req, res, next) => {
  try {
    await rentService.getRent(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* update rent */
exports.updateRent = async (req, res, next) => {
  try {
    await rentService.updateRent(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* delete rent */
exports.deleteRent = async (req, res, next) => {
  try {
    await rentService.deleteRent(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};
