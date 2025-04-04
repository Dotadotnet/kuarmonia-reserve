
/* internal import */
const venueAmenityService = require("../services/venueAmenity.service");

/* add new venueAmenity */
exports.addVenueAmenity = async (req, res, next) => {
  try {
    await venueAmenityService.addVenueAmenity(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* get all venueAmenitys */
exports.getVenueAmenities = async (req, res, next) => {
  try {
    await venueAmenityService.getVenueAmenities(res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* get a venueAmenity */
exports.getVenueAmenity = async (req, res, next) => {
  try {
    await venueAmenityService.getVenueAmenity(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* update venueAmenity */
exports.updateVenueAmenity = async (req, res, next) => {
  try {
    await venueAmenityService.updateVenueAmenity(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* delete venueAmenity */
exports.deleteVenueAmenity = async (req, res, next) => {
  try {
    await venueAmenityService.deleteVenueAmenity(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};
