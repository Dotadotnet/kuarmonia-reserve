

/* internal imports */
const storeService = require("../services/store.service");

/* create store */
exports.addStore = async (req, res, next) => {
  try {
    await storeService.addStore(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* get all stores */
exports.getStores = async (req, res, next) => {
  try {
    await storeService.getStores(res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

// get a store
exports.getStore = async (req, res, next) => {
  try {
    await storeService.getStore(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* update store */
exports.updateStore = async (req, res, next) => {
  try {
    await storeService.updateStore(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* delete store */
exports.deleteStore = async (req, res, next) => {
  try {
    await storeService.deleteStore(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};
