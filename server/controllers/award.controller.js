
/* internal import */
const awardService = require("../services/award.service");

/* add new award */
exports.addAward = async (req, res, next) => {
  try {
    await awardService.addAward(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* get all awards */
exports.getAwards = async (req, res, next) => {
  try {
    await awardService.getAwards(req,res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* get a award */
exports.getAward = async (req, res, next) => {
  try {
    await awardService.getAward(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* update award */
exports.updateAward = async (req, res, next) => {
  try {
    await awardService.updateAward(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* delete award */
exports.deleteAward = async (req, res, next) => {
  try {
    await awardService.deleteAward(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};
