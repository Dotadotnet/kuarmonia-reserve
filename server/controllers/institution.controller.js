
/* internal import */
const institutionService = require("../services/institution.service");

/* add new institution */
exports.addInstitution = async (req, res, next) => {
  try {
    await institutionService.addInstitution(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* get all institutions */
exports.getInstitutions = async (req, res, next) => {
  try {
    await institutionService.getInstitutions(req,res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* get a institution */
exports.getInstitution = async (req, res, next) => {
  try {
    await institutionService.getInstitution(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* update institution */
exports.updateInstitution = async (req, res, next) => {
  try {
    await institutionService.updateInstitution(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* delete institution */
exports.deleteInstitution = async (req, res, next) => {
  try {
    await institutionService.deleteInstitution(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};
