
/* internal import */
const newsTypeService = require("../services/newsType.service");

/* add new newsType */
exports.addNewsType = async (req, res, next) => {
  try {
    await newsTypeService.addNewsType(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* get all newsTypes */
exports.getNewsTypes = async (req, res, next) => {
  try {
    await newsTypeService.getNewsTypes(req,res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* get a newsType */
exports.getNewsType = async (req, res, next) => {
  try {
    await newsTypeService.getNewsType(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* update newsType */
exports.updateNewsType = async (req, res, next) => {
  try {
    await newsTypeService.updateNewsType(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* delete newsType */
exports.deleteNewsType = async (req, res, next) => {
  try {
    await newsTypeService.deleteNewsType(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};
