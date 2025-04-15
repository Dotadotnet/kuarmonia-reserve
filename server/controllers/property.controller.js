
/* internal import */
const propertyService = require("../services/property.service");

/* add new property */
exports.addProperty = async (req, res, next) => {
  try {
    await propertyService.addProperty(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* get all propertys */
exports.getProperties = async (req, res, next) => {
  try {
    await propertyService.getProperties(res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* get a property */
exports.getProperty = async (req, res, next) => {
  try {
    await propertyService.getProperty(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

exports.getPropertyById = async (req, res, next) => {
  try {
    await propertyService.getPropertyById(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* update property */
exports.updateProperty = async (req, res, next) => {
  try {
    await propertyService.updateProperty(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* delete property */
exports.deleteProperty = async (req, res, next) => {
  try {
    await propertyService.deleteProperty(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};
