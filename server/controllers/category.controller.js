

/* internal import */
const categoryService = require("../services/category.service");

/* add new category */
exports.addCategory = async (req, res, next) => {
  try {
    await categoryService.addCategory(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* get all categories */
exports.getCategories = async (req, res, next) => {
  try {
    await categoryService.getCategories(res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* get categories with products */
exports.getProductCategories = async (req, res, next) => {
  try {
    await categoryService.getProductCategories(res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};


/* get a category */
exports.getCategory = async (req, res, next) => {
  try {
    await categoryService.getCategory(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* update category */
exports.updateCategory = async (req, res, next) => {
  try {
    await categoryService.updateCategory(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* delete category */
exports.deleteCategory = async (req, res, next) => {
  try {

    await categoryService.deleteCategory(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};
