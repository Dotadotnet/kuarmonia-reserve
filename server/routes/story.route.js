/* external import */
const express = require("express");

/* middleware imports */
const upload = require("../middleware/upload.middleware");

/* internal import */
const storyController = require("../controllers/story.controller");
const verify = require("../middleware/verify.middleware");
const authorize = require("../middleware/authorize.middleware");
const localeMiddleware = require("../middleware/locale.middleware");

/* router level connection */
const router = express.Router();

/* router methods integration */

// add new story
router.post(
  "/add-story",
  verify,
  authorize("superAdmin","admin"),
  upload("story").single("media"),
  storyController.addStory
);

// get all categories
router.get("/get-stories",localeMiddleware, storyController.getStories);

// get a story
router.get("/get-story/:id", localeMiddleware, storyController.getStory);

// get stories with children only
router.get("/get-stories-with-children", localeMiddleware, storyController.getStoriesWithChildren);

// get all stories (both parent and child)
router.get("/get-all-stories", localeMiddleware, storyController.getAllStories);

// update story
router.patch(
  "/update-story/:id",
  verify,
  authorize("superAdmin","admin"),
  upload('story').single("media"),
  storyController.updateStory
);

// update story order
router.patch(
  "/update-story-order",
  verify,
  authorize("superAdmin","admin"),
  storyController.updateStoryOrder
);

// delete story
router.delete(
  "/delete-story/:id",
  verify,
  authorize("superAdmin","admin"),

  storyController.deleteStory
);

module.exports = router;
