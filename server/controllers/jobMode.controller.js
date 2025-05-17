

/* internal import */
const jobModeService = require("../services/jobMode.service");

/* add new jobMode */
exports.addJobMode = async (req, res, next) => {
  try {
    await jobModeService.addJobMode(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* get all jobModes */
exports.getJobModes = async (req, res, next) => {
  try {
    await jobModeService.getJobModes(req,res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};


/* get a jobMode */
exports.getJobMode = async (req, res, next) => {
  try {
    await jobModeService.getJobMode(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* update jobMode */
exports.updateJobMode = async (req, res, next) => {
  try {
    await jobModeService.updateJobMode(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* delete jobMode */
exports.deleteJobMode = async (req, res, next) => {
  try {

    await jobModeService.deleteJobMode(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};
