
/* internal import */
const tagService = require("../services/tag.service");

/* get all tags */
exports.getTags = async (req, res, next) => {
  try {
    await tagService.getTags(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* get a tag */
exports.getTag = async (req, res, next) => {
  console.log("getTag route called with id:", req.params.id);
  try {
    await tagService.getTag(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

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

exports.getItem = async (req, res, next) => {
  try {
    await tagService.getItem(req, res);
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

/* get tags by IDs */
exports.getTagsByIds = async (req, res, next) => {
  try {
    await tagService.getTagsByIds(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* get a tag by tagId */
exports.getTagByTagId = async (req, res, next) => {
  console.log("getTagByTagId route called with tagId:", req.params.tagId);
  try {
    await tagService.getTagByTagId(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};
