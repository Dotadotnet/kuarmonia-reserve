

/* external import */
const express = require("express");

/* middleware imports */
const upload = require("../middleware/upload.middleware");

/* internal import */
const tagController = require("../controllers/tag.controller");
const verify = require("../middleware/verify.middleware");
const authorize = require("../middleware/authorize.middleware");

/* router level connection */
const router = express.Router();

/* router methods integration */

// add new tag
router.post(
  "/add-tag",
  verify,
  authorize("superAdmin", "admin"),
  tagController.addTag
);

// get all tags
router.get("/get-tags", tagController.getTags);

// get a tag
router.get("/get-tag/:id", tagController.getTag);

// update tag
router.patch(
  "/update-tag/:id",
  verify,
  authorize("superAdmin", "admin"),
  upload('tag').single("logo"),
  tagController.updateTag
);

// delete tag
router.delete(
  "/delete-tag/:id",
  verify,
  authorize("superAdmin", "admin"),
  tagController.deleteTag
);

module.exports = router;
