/* external import */
const express = require("express");

/* middleware imports */

/* internal import */
const jobTimeController = require("../controllers/jobTime.controller");
const verify = require("../middleware/verify.middleware");
const authorize = require("../middleware/authorize.middleware");
const localeMiddleware = require("../middleware/locale.middleware");

const router = express.Router();


router.post(
  "/add-jobTime",
  verify,
  authorize("superAdmin", "admin"),
  jobTimeController.addJobTime
);

router.get("/get-jobTimes", localeMiddleware, jobTimeController.getJobTimes);

router.get("/get-jobTime/:id", jobTimeController.getJobTime);

router.patch(
  "/update-jobTime/:id",
  verify,
  authorize("superAdmin", "admin"),
  jobTimeController.updateJobTime
);

router.delete(
  "/delete-jobTime/:id",
  verify,
  authorize("superAdmin", "admin"),

  jobTimeController.deleteJobTime
);

module.exports = router;
