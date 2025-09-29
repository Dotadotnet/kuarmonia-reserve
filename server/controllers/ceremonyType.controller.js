
/* internal import */
const ceremonyTypeService = require("../services/ceremonyType.service");

/* add new ceremonyType */
exports.addCeremonyType = async (req, res, next) => {
  try {
    await ceremonyTypeService.addCeremonyType(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* get all ceremonyTypes */

exports.getCeremonyTypes = async (req, res, next) => {
  try {
    await ceremonyTypeService.getCeremonyTypes(req,res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};
/* get a ceremonyType */
exports.getCeremonyType = async (req, res, next) => {
  try {
    await ceremonyTypeService.getCeremonyType(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* update ceremonyType */
exports.updateCeremonyType = async (req, res, next) => {
  try {
    await ceremonyTypeService.updateCeremonyType(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* delete ceremonyType */
exports.deleteCeremonyType = async (req, res, next) => {
  try {
    await ceremonyTypeService.deleteCeremonyType(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};
