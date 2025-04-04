
/* internal import */
const venueService = require("../services/venue.service");

/* add new venue */
exports.addVenue = async (req, res, next) => {
  try {
    await venueService.addVenue(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* get all venues */
exports.getVenues = async (req, res, next) => {
  try {
    await venueService.getVenues(res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* get a venue */
exports.getVenue = async (req, res, next) => {
  try {
    await venueService.getVenue(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* update venue */
exports.updateVenue = async (req, res, next) => {
  try {
    await venueService.updateVenue(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* delete venue */
exports.deleteVenue = async (req, res, next) => {
  try {
    await venueService.deleteVenue(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};
