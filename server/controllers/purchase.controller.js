

const purchaseService = require("../services/purchase.service");

// get all purchases
exports.getAllPurchases = async (req, res, next) => {
  try {
    await purchaseService.getAllPurchases(res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

// update purchase status
exports.updatePurchaseStatus = async (req, res, next) => {
  try {
    await purchaseService.updatePurchaseStatus(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};
