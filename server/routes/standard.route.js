

/* external import */
const express = require("express");

/* middleware imports */
const upload = require("../middleware/upload.middleware");

/* internal import */
const standardController = require("../controllers/standard.controller");
const verify = require("../middleware/verify.middleware");
const authorize = require("../middleware/authorize.middleware");
const localeMiddleware = require("../middleware/locale.middleware");

/* router level connection */
const router = express.Router();

/* router methods integration */

// add new standard
router.post(
  "/add-standard",
  verify,
  authorize("admin", "superAdmin"),
  upload('propstandard').single("thumbnail"),
  standardController.addStandard
);

// get all standards
router.get("/get-standards",localeMiddleware, standardController.getStandards);

// get a standard
router.get("/get-standard/:id", standardController.getStandard);

// update standard
router.patch(
  "/update-standard/:id",
  verify,
  authorize("admin", "seller"),
  upload('propstandard').single("thumbnail"),
  standardController.updateStandard
);

// delete standard
router.delete(
  "/delete-standard/:id",
  verify,
  authorize("admin", "superAdmin"),
  standardController.deleteStandard
);

module.exports = router;
