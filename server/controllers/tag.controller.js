
/* internal import */
const tagService = require("../services/tag.service");

/* add new tag */
exports.addTag = async (req, res, next) => {
  try {
    await tagService.addTag(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* get all tags */
exports.getTags = async (req, res, next) => {
  try {
    await tagService.getTags(req,res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* get a tag */
exports.getTag = async (req, res, next) => {
  try {
    await tagService.getTag(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* update tag */
exports.updateTag = async (req, res, next) => {
  try {
    await tagService.updateTag(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* delete tag */
exports.deleteTag = async (req, res, next) => {
  try {
    await tagService.deleteTag(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};
