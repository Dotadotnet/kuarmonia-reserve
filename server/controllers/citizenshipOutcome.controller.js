

/* internal import */
const citizenshipOutcomeService = require("../services/citizenshipOutcome.service");

/* add new citizenshipOutcome */
exports.addCitizenshipOutcome = async (req, res, next) => {
  try {
    await citizenshipOutcomeService.addCitizenshipOutcome(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* get all citizenshipOutcomes */
exports.getCitizenshipOutcomes = async (req, res, next) => {
  try {
    await citizenshipOutcomeService.getCitizenshipOutcomes(req,res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};



/* get a citizenshipOutcome */
exports.getCitizenshipOutcome = async (req, res, next) => {
  try {
    await citizenshipOutcomeService.getCitizenshipOutcome(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* update citizenshipOutcome */
exports.updateCitizenshipOutcome = async (req, res, next) => {
  try {
    await citizenshipOutcomeService.updateCitizenshipOutcome(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* delete citizenshipOutcome */
exports.deleteCitizenshipOutcome = async (req, res, next) => {
  try {

    await citizenshipOutcomeService.deleteCitizenshipOutcome(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};
