

/* internal import */
const productService = require("../services/product.service");

/* add new product */
exports.addProduct = async (req, res, next) => {
  try {
    await productService.addProduct(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* get all products */
exports.getProducts = async (req, res, next) => {
  try {
    await productService.getProducts(res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

exports.getDetailsProducts = async (req, res, next) => {
  try {
    await productService.getDetailsProducts(res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* update product */
exports.updateProduct = async (req, res, next) => {
  try {
    await productService.updateProduct(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

exports.updateApproveProduct = async (req, res, next) => {
  try {
    await productService.updateApproveProduct(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

exports.updateRejectProduct = async (req, res, next) => {
  try {
    await productService.updateRejectProduct(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

exports.updateReviewProduct = async (req, res, next) => {
  try {
    await productService.updateReviewProduct(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

exports.updateStatusProduct = async (req, res, next) => {
  try {
    await productService.updateStatusProduct(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};


/* get a single product */
exports.getProduct = async (req, res, next) => {
  try {
    await productService.getProduct(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* get a  product by cart */
exports.getProductCart = async (req, res, next) => {
  try {
    await productService.getProductCart(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* filtered products */
exports.getFilteredProducts = async (req, res, next) => {
  try {
    await productService.getFilteredProducts(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* delete product */
exports.deleteProduct = async (req, res, next) => {
  try {
    await productService.deleteProduct(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};
