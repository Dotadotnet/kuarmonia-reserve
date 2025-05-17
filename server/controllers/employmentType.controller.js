

/* internal import */
const employmentTypeService = require("../services/employmentType.service");

/* add new employmentType */
exports.addEmploymentType = async (req, res, next) => {
  try {
    await employmentTypeService.addEmploymentType(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* get all employmentTypes */
exports.getEmploymentTypes = async (req, res, next) => {
  try {
    await employmentTypeService.getEmploymentTypes(req,res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};



/* get a employmentType */
exports.getEmploymentType = async (req, res, next) => {
  try {
    await employmentTypeService.getEmploymentType(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* update employmentType */
exports.updateEmploymentType = async (req, res, next) => {
  try {
    await employmentTypeService.updateEmploymentType(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* delete employmentType */
exports.deleteEmploymentType = async (req, res, next) => {
  try {

    await employmentTypeService.deleteEmploymentType(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};
