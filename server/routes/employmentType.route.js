/* external import */
const express = require("express");

/* middleware imports */

/* internal import */
const employmentTypeController = require("../controllers/employmentType.controller");
const verify = require("../middleware/verify.middleware");
const authorize = require("../middleware/authorize.middleware");
const localeMiddleware = require("../middleware/locale.middleware");

const router = express.Router();


router.post(
  "/add-employmentType",
  verify,
  authorize("superAdmin", "admin"),
  employmentTypeController.addEmploymentType
);

router.get("/get-employmentTypes", localeMiddleware, employmentTypeController.getEmploymentTypes);

router.get("/get-employmentType/:id", employmentTypeController.getEmploymentType);

router.patch(
  "/update-employmentType/:id",
  verify,
  authorize("superAdmin", "admin"),
  employmentTypeController.updateEmploymentType
);

router.delete(
  "/delete-employmentType/:id",
  verify,
  authorize("superAdmin", "admin"),

  employmentTypeController.deleteEmploymentType
);

module.exports = router;
