
/* internal import */
const venueTypeService = require("../services/venueType.service");

/* add new venueType */
exports.addVenueType = async (req, res, next) => {
  try {
    await venueTypeService.addVenueType(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* get all venueTypes */
exports.getVenueTypes = async (req, res, next) => {
  try {
    await venueTypeService.getVenueTypes(res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};


/* get a venueType */
exports.getVenueType = async (req, res, next) => {
  try {
    await venueTypeService.getVenueType(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* update venueType */
exports.updateVenueType = async (req, res, next) => {
  try {
    await venueTypeService.updateVenueType(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* delete venueType */
exports.deleteVenueType = async (req, res, next) => {
  try {
    await venueTypeService.deleteVenueType(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};
