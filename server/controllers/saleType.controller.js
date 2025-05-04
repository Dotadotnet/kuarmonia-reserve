

/* internal import */
const saleTypesService = require("../services/saleType.service");

/* add new saleTypes */
exports.addSaleType = async (req, res, next) => {
  try {
    await saleTypesService.addSaleType(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* get all saletypes */
exports.getSaleTypes = async (req, res, next) => {
  try {
    await saleTypesService.getSaleTypes(req,res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};



/* get a saleTypes */
exports.getSaleType = async (req, res, next) => {
  try {
    await saleTypesService.getSaleType(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* update saleTypes */
exports.updateSaleType = async (req, res, next) => {
  try {
    await saleTypesService.updateSaleType(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* delete saleTypes */
exports.deleteSaleType = async (req, res, next) => {
  try {
    await saleTypesService.deleteSaleType(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};
