
/* internal import */
const dynamicService = require("../services/dynamic.service");

exports.get = async (req, res, next) => {
  try {
    await dynamicService.get(req,res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};



/* update dynamic */
exports.update = async (req, res, next) => {
  try {
    await dynamicService.update(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* delete dynamic */
exports.delete = async (req, res, next) => {
  try {
    await dynamicService.delete(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};
