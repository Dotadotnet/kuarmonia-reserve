

/* internal import */
const jobTypeService = require("../services/jobType.service");

/* add new jobType */
exports.addJobType = async (req, res, next) => {
  try {
    await jobTypeService.addJobType(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* get all jobTypes */
exports.getJobTypes = async (req, res, next) => {
  try {
    await jobTypeService.getJobTypes(req,res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};


/* get a jobType */
exports.getJobType = async (req, res, next) => {
  try {
    await jobTypeService.getJobType(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* update jobType */
exports.updateJobType = async (req, res, next) => {
  try {
    await jobTypeService.updateJobType(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* delete jobType */
exports.deleteJobType = async (req, res, next) => {
  try {

    await jobTypeService.deleteJobType(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};
