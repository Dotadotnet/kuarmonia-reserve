
/* internal import */
const venueServiceService = require("../services/venueService.service");

/* add new venueService */
exports.addVenueService = async (req, res, next) => {
  try {
    await venueServiceService.addVenueService(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* get all venueServices */
exports.getVenueServices = async (req, res, next) => {
  try {
    await venueServiceService.getVenueServices(res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* get a venueService */
exports.getVenueService = async (req, res, next) => {
  try {
    await venueServiceService.getVenueService(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* update venueService */
exports.updateVenueService = async (req, res, next) => {
  try {
    await venueServiceService.updateVenueService(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* delete venueService */
exports.deleteVenueService = async (req, res, next) => {
  try {
    await venueServiceService.deleteVenueService(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};
