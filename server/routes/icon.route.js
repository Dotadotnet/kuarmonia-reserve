

/* external import */
const express = require("express");

/* middleware imports */
const upload = require("../middleware/upload.middleware");

/* internal import */
const iconController = require("../controllers/icon.controller");
const verify = require("../middleware/verify.middleware");
const authorize = require("../middleware/authorize.middleware");

/* router level connection */
const router = express.Router();

/* router methods integration */

// add new icon
router.post(
  "/add-icon",
  verify,
  authorize("superAdmin", "admin"),
  iconController.addIcon
);

// get all icons
router.get("/get-icons", iconController.getIcons);

// get a icon
router.get("/get-icon/:id", iconController.getIcon);

// update icon
router.patch(
  "/update-icon/:id",
  verify,
  authorize("superAdmin", "admin"),
  upload('icon').single("logo"),
  iconController.updateIcon
);

// delete icon
router.delete(
  "/delete-icon/:id",
  verify,
  authorize("superAdmin", "admin"),
  iconController.deleteIcon
);

module.exports = router;
