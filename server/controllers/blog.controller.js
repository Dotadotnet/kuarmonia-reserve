
/* internal import */
const blogService = require("../services/blog.service");

/* add new blog */
exports.addBlog = async (req, res, next) => {
  try {
    await blogService.addBlog(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* get all blogs */
exports.getBlogs = async (req, res, next) => {
  try {
    await blogService.getBlogs(res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* get a blog */
exports.getBlog = async (req, res, next) => {
  try {
    await blogService.getBlog(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* update blog */
exports.updateBlog = async (req, res, next) => {
  try {
    await blogService.updateBlog(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* delete blog */
exports.deleteBlog = async (req, res, next) => {
  try {
    await blogService.deleteBlog(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};
