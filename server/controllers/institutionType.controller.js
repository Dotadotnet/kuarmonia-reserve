

/* internal import */
const institutionTypeService = require("../services/institutionType.service");

/* add new institutionType */
exports.addInstitutionType = async (req, res, next) => {
  try {
    await institutionTypeService.addInstitutionType(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* get all institutionTypes */
exports.getInstitutionTypes = async (req, res, next) => {
  try {
    await institutionTypeService.getInstitutionTypes(req,res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};



/* get a institutionType */
exports.getInstitutionType = async (req, res, next) => {
  try {
    await institutionTypeService.getInstitutionType(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* update institutionType */
exports.updateInstitutionType = async (req, res, next) => {
  try {
    await institutionTypeService.updateInstitutionType(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* delete institutionType */
exports.deleteInstitutionType = async (req, res, next) => {
  try {

    await institutionTypeService.deleteInstitutionType(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};
