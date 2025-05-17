

/* external import */
const express = require("express");

/* middleware imports */
const upload = require("../middleware/upload.middleware");

/* internal import */
const institutionController = require("../controllers/institution.controller");
const verify = require("../middleware/verify.middleware");
const authorize = require("../middleware/authorize.middleware");
const localeMiddleware = require("../middleware/locale.middleware");

/* router level connection */
const router = express.Router();

/* router methods integration */

// add new institution
router.post(
  "/add-institution",
  verify,
  authorize("admin", "superAdmin"),
  upload('propinstitution').single("thumbnail"),
  institutionController.addInstitution
);

// get all institutions
router.get("/get-institutions",localeMiddleware, institutionController.getInstitutions);

// get a institution
router.get("/get-institution/:id", institutionController.getInstitution);

// update institution
router.patch(
  "/update-institution/:id",
  verify,
  authorize("admin", "seller"),
  upload('institution').single("logo"),
  institutionController.updateInstitution
);

// delete institution
router.delete(
  "/delete-institution/:id",
  verify,
  authorize("admin", "superAdmin"),
  institutionController.deleteInstitution
);

module.exports = router;
