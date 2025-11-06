/* internal import */
const storyService = require("../services/story.service");

/* add new story */
exports.addStory = async (req, res, next) => {
  try {
    await storyService.addStory(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* get all categories */
exports.getStories = async (req, res, next) => {
  try {
    await storyService.getStories(req,res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};



/* get a story */
exports.getStory = async (req, res, next) => {
  try {
    await storyService.getStory(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* get stories with children only */
exports.getStoriesWithChildren = async (req, res, next) => {
  try {
    await storyService.getStoriesWithChildren(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* get all stories (both parent and child) */
exports.getAllStories = async (req, res, next) => {
  try {
    await storyService.getAllStories(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* update story */
exports.updateStory = async (req, res, next) => {
  try {
    await storyService.updateStory(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* update story order */
exports.updateStoryOrder = async (req, res, next) => {
  try {
    await storyService.updateStoryOrder(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* delete story */
exports.deleteStory = async (req, res, next) => {
  try {

    await storyService.deleteStory(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};
