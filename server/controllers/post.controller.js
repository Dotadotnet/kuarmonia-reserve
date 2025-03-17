
/* internal import */
const postService = require("../services/post.service");

/* add new post */
exports.addPost = async (req, res, next) => {
  try {
    await postService.addPost(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* get all posts */
exports.getPosts = async (req, res, next) => {
  try {
    await postService.getPosts(res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* get a post */
exports.getPost = async (req, res, next) => {
  try {
    await postService.getPost(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* update post */
exports.updatePost = async (req, res, next) => {
  try {
    await postService.updatePost(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* delete post */
exports.deletePost = async (req, res, next) => {
  try {
    await postService.deletePost(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};
