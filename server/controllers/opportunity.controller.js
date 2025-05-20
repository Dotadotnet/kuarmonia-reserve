
/* internal import */
const opportunityService = require("../services/opportunity.service");

/* add new opportunity */
exports.addJobOpportunity= async (req, res, next) => {
  try {
    await opportunityService.addJobOpportunity(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* get all opportunitys */
exports.getAllOpportunity = async (req, res, next) => {
  try {
    await opportunityService.getAllOpportunity(res,req);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* get a opportunity */
exports.getOpportunity= async (req, res, next) => {
  try {
    await opportunityService.getOpportunity(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* update opportunity */
exports.updateOpportunity= async (req, res, next) => {
  try {
    await opportunityService.updateVenue(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* delete opportunity */
exports.deleteOpportunity= async (req, res, next) => {
  try {
    await opportunityService.deleteOpportunity(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};
