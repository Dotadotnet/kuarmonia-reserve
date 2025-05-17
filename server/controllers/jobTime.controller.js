

/* internal import */
const jobTimeService = require("../services/jobTime.service");

/* add new jobTime */
exports.addJobTime = async (req, res, next) => {
  try {
    await jobTimeService.addJobTime(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* get all jobTimes */
exports.getJobTimes = async (req, res, next) => {
  try {
    await jobTimeService.getJobTimes(req,res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};


/* get a jobTime */
exports.getJobTime = async (req, res, next) => {
  try {
    await jobTimeService.getJobTime(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* update jobTime */
exports.updateJobTime = async (req, res, next) => {
  try {
    await jobTimeService.updateJobTime(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* delete jobTime */
exports.deleteJobTime = async (req, res, next) => {
  try {

    await jobTimeService.deleteJobTime(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};
