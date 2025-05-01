
/* internal import */
const newsCountryService = require("../services/newsCountry.service");

/* add new newsCountry */
exports.addNewsCountry = async (req, res, next) => {
  try {
    await newsCountryService.addNewsCountry(res, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* get all newsCountries */
exports.getNewsCountries = async (req, res, next) => {
  try {
    await newsCountryService.getNewsCountries(res,req);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* get a newsCountry */
exports.getNewsCountry = async (req, res, next) => {
  try {
    await newsCountryService.getNewsCountry(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* update newsCountry */
exports.updateNewsCountry = async (req, res, next) => {
  try {
    await newsCountryService.updateNewsCountry(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* delete newsCountry */
exports.deleteNewsCountry = async (req, res, next) => {
  try {
    await newsCountryService.deleteNewsCountry(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};
