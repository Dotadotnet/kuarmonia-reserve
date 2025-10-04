/* internal import */
const countryService = require("../services/country.service");

/* add new country */
exports.addCountry = async (req, res, next) => {
  try {
    await countryService.addCountry(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* get all countries */
exports.getCountries = async (req, res, next) => {
  try {
    await countryService.getCountries(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* get a country */
exports.getCountry = async (req, res, next) => {
  try {
    await countryService.getCountry(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* update country */
exports.updateCountry = async (req, res, next) => {
  try {
    await countryService.updateCountry(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* delete country */
exports.deleteCountry = async (req, res, next) => {
  try {
    await countryService.deleteCountry(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};











