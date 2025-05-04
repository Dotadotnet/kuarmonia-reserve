

/* internal import */
const tradeTypesService = require("../services/tradeType.service");

/* add new tradeTypes */
exports.addTradeType = async (req, res, next) => {
  try {
    await tradeTypesService.addTradeType(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* get all categories */
exports.getTradeTypes = async (req, res, next) => {
  try {
    await tradeTypesService.getTradeTypes(req,res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};



/* get a tradeTypes */
exports.getTradeType = async (req, res, next) => {
  try {
    await tradeTypesService.getTradeType(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* update tradeTypes */
exports.updateTradeType = async (req, res, next) => {
  try {
    await tradeTypesService.updateTradeType(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* delete tradeTypes */
exports.deleteTradeType = async (req, res, next) => {
  try {

    await tradeTypesService.deleteTradeType(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};
