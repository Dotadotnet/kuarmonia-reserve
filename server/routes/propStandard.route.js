

/* external import */
const express = require("express");

/* middleware imports */
const upload = require("../middleware/upload.middleware");

/* internal import */
const propStandardController = require("../controllers/propStandard.controller");
const verify = require("../middleware/verify.middleware");
const authorize = require("../middleware/authorize.middleware");

/* router level connection */
const router = express.Router();

/* router methods integration */

// add new propStandard
router.post(
  "/add-propStandard",
  verify,
  authorize("admin", "superAdmin"),
  upload('propstandard').single("thumbnail"),
  propStandardController.addPropStandard
);

// get all propStandards
router.get("/get-propStandards", propStandardController.getPropStandards);

// get a propStandard
router.get("/get-propStandard/:id", propStandardController.getPropStandard);

// update propStandard
router.patch(
  "/update-propStandard/:id",
  verify,
  authorize("admin", "seller"),
  upload('propstandard').single("thumbnail"),
  propStandardController.updatePropStandard
);

// delete propStandard
router.delete(
  "/delete-propStandard/:id",
  verify,
  authorize("admin", "superAdmin"),
  propStandardController.deletePropStandard
);

module.exports = router;
