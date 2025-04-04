
/* internal import */
const venueStandardService = require("../services/venueStandard.service");

/* add new venueStandard */
exports.addVenueStandard = async (req, res, next) => {
  try {
    await venueStandardService.addVenueStandard(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* get all venueStandards */
exports.getVenueStandards = async (req, res, next) => {
  try {
    await venueStandardService.getVenueStandards(res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* get a venueStandard */
exports.getVenueStandard = async (req, res, next) => {
  try {
    await venueStandardService.getVenueStandard(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* update venueStandard */
exports.updateVenueStandard = async (req, res, next) => {
  try {
    await venueStandardService.updateVenueStandard(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* delete venueStandard */
exports.deleteVenueStandard = async (req, res, next) => {
  try {
    await venueStandardService.deleteVenueStandard(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};
