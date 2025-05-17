/* external import */
const express = require("express");

/* middleware imports */
const upload = require("../middleware/upload.middleware");

/* internal import */
const jobTypeController = require("../controllers/jobType.controller");
const verify = require("../middleware/verify.middleware");
const authorize = require("../middleware/authorize.middleware");
const localeMiddleware = require("../middleware/locale.middleware");

const router = express.Router();


router.post(
  "/add-jobType",
  verify,
  authorize("superAdmin", "admin"),
  upload("job-type").single("thumbnail"),
  jobTypeController.addJobType
);

router.get("/get-jobTypes", localeMiddleware, jobTypeController.getJobTypes);

router.get("/get-jobType/:id", jobTypeController.getJobType);

router.patch(
  "/update-jobType/:id",
  verify,
  authorize("superAdmin", "admin"),
  upload("jobType").single("thumbnail"),
  jobTypeController.updateJobType
);

router.delete(
  "/delete-jobType/:id",
  verify,
  authorize("superAdmin", "admin"),

  jobTypeController.deleteJobType
);

module.exports = router;
