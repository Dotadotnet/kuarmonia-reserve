/* external import */
const express = require("express");

/* middleware imports */

/* internal import */
const jobModeController = require("../controllers/jobMode.controller");
const verify = require("../middleware/verify.middleware");
const authorize = require("../middleware/authorize.middleware");
const localeMiddleware = require("../middleware/locale.middleware");

const router = express.Router();


router.post(
  "/add-jobMode",
  verify,
  authorize("superAdmin", "admin"),
  jobModeController.addJobMode
);

router.get("/get-jobModes", localeMiddleware, jobModeController.getJobModes);

router.get("/get-jobMode/:id", jobModeController.getJobMode);

router.patch(
  "/update-jobMode/:id",
  verify,
  authorize("superAdmin", "admin"),
  jobModeController.updateJobMode
);

router.delete(
  "/delete-jobMode/:id",
  verify,
  authorize("superAdmin", "admin"),

  jobModeController.deleteJobMode
);

module.exports = router;
