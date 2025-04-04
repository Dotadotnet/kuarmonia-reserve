
/* internal import */
const venueSettingService = require("../services/venueSetting.service");

/* add new venueSetting */
exports.addVenueSetting = async (req, res, next) => {
  try {
    await venueSettingService.addVenueSetting(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* get all venueSettings */
exports.getVenueSettings = async (req, res, next) => {
  try {
    await venueSettingService.getVenueSettings(res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* get a venueSetting */
exports.getVenueSetting = async (req, res, next) => {
  try {
    await venueSettingService.getVenueSetting(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* update venueSetting */
exports.updateVenueSetting = async (req, res, next) => {
  try {
    await venueSettingService.updateVenueSetting(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* delete venueSetting */
exports.deleteVenueSetting = async (req, res, next) => {
  try {
    await venueSettingService.deleteVenueSetting(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};
