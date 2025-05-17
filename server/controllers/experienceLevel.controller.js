

/* internal import */
const experienceLevelService = require("../services/experienceLevel.service");

/* add new experienceLevel */
exports.addExperienceLevel = async (req, res, next) => {
  try {
    await experienceLevelService.addExperienceLevel(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* get all experienceLevels */
exports.getExperienceLevels = async (req, res, next) => {
  try {
    await experienceLevelService.getExperienceLevels(req,res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};


/* get a experienceLevel */
exports.getExperienceLevel = async (req, res, next) => {
  try {
    await experienceLevelService.getExperienceLevel(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* update experienceLevel */
exports.updateExperienceLevel = async (req, res, next) => {
  try {
    await experienceLevelService.updateExperienceLevel(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* delete experienceLevel */
exports.deleteExperienceLevel = async (req, res, next) => {
  try {

    await experienceLevelService.deleteExperienceLevel(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};
