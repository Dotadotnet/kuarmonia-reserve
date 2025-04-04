
/* internal import */
const venueAwardService = require("../services/venueAward.service");

/* add new venueAward */
exports.addVenueAward = async (req, res, next) => {
  try {
    await venueAwardService.addVenueAward(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* get all venueAwards */
exports.getVenueAwards = async (req, res, next) => {
  try {
    await venueAwardService.getVenueAwards(res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* get a venueAward */
exports.getVenueAward = async (req, res, next) => {
  try {
    await venueAwardService.getVenueAward(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* update venueAward */
exports.updateVenueAward = async (req, res, next) => {
  try {
    await venueAwardService.updateVenueAward(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* delete venueAward */
exports.deleteVenueAward = async (req, res, next) => {
  try {
    await venueAwardService.deleteVenueAward(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};
