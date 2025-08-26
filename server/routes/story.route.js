

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
router.get("/get-story/:id", storyController.getStory);

// update story
router.patch(
  "/update-story/:id",
  verify,
  authorize("superAdmin","admin"),
  upload('story').single("media"),
  storyController.updateStory
);

// delete story
router.delete(
  "/delete-story/:id",
  verify,
  authorize("superAdmin","admin"),

  storyController.deleteStory
);

module.exports = router;
