
/* internal import */
const venueVendorService = require("../services/venueVendor.service");

/* add new venueVendor */
exports.addVenueVendor = async (req, res, next) => {
  try {
    await venueVendorService.addVenueVendor(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* get all venueVendors */
exports.getVenueVendors = async (req, res, next) => {
  try {
    await venueVendorService.getVenueVendors(res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* get a venueVendor */
exports.getVenueVendor = async (req, res, next) => {
  try {
    await venueVendorService.getVenueVendor(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* update venueVendor */
exports.updateVenueVendor = async (req, res, next) => {
  try {
    await venueVendorService.updateVenueVendor(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* delete venueVendor */
exports.deleteVenueVendor = async (req, res, next) => {
  try {
    await venueVendorService.deleteVenueVendor(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};
