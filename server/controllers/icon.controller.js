
/* internal import */
const iconService = require("../services/icon.service");

/* add new icon */
exports.addIcon = async (req, res, next) => {
  try {
    await iconService.addIcon(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* get all icons */
exports.getIcons = async (req, res, next) => {
  try {
    await iconService.getIcons(req,res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* get a icon */
exports.getIcon = async (req, res, next) => {
  try {
    await iconService.getIcon(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* update icon */
exports.updateIcon = async (req, res, next) => {
  try {
    await iconService.updateIcon(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* delete icon */
exports.deleteIcon = async (req, res, next) => {
  try {
    await iconService.deleteIcon(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};
