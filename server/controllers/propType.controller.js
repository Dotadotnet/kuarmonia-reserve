

/* internal import */
const propTypesService = require("../services/propType.service");

/* add new propTypes */
exports.addPropType = async (req, res, next) => {
  try {
    await propTypesService.addPropType(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* get all proptypes */
exports.getPropTypes = async (req, res, next) => {
  try {
    await propTypesService.getPropTypes(req,res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};



/* get a propTypes */
exports.getPropType = async (req, res, next) => {
  try {
    await propTypesService.getPropType(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* update propTypes */
exports.updatePropType = async (req, res, next) => {
  try {
    await propTypesService.updatePropType(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* delete propTypes */
exports.deletePropType = async (req, res, next) => {
  try {
    await propTypesService.deletePropType(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};
