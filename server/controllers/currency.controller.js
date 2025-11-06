exports.addCurrency = async (req, res, next) => {
  try {
    await currencyService.addCurrency(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* internal import */
const currencyService = require("../services/currency.service");

/* get all currencies */
exports.getCurrencies = async (req, res, next) => {
  try {
    await currencyService.getCurrencies(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* get a currency */
exports.getCurrency = async (req, res, next) => {
  try {
    await currencyService.getCurrency(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* update currency */
exports.updateCurrency = async (req, res, next) => {
  try {
    await currencyService.updateCurrency(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* delete currency */
exports.deleteCurrency = async (req, res, next) => {
  try {
    await currencyService.deleteCurrency(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};
