/* external import */
const express = require("express");

/* middleware imports */

/* internal import */
const institutionTypeController = require("../controllers/institutionType.controller");
const verify = require("../middleware/verify.middleware");
const authorize = require("../middleware/authorize.middleware");
const localeMiddleware = require("../middleware/locale.middleware");

const router = express.Router();


router.post(
  "/add-institutionType",
  verify,
  authorize("superAdmin", "admin"),
  institutionTypeController.addInstitutionType
);

router.get("/get-institutionTypes", localeMiddleware, institutionTypeController.getInstitutionTypes);

router.get("/get-institutionType/:id", institutionTypeController.getInstitutionType);

router.patch(
  "/update-institutionType/:id",
  verify,
  authorize("superAdmin", "admin"),
  institutionTypeController.updateInstitutionType
);

router.delete(
  "/delete-institutionType/:id",
  verify,
  authorize("superAdmin", "admin"),

  institutionTypeController.deleteInstitutionType
);

module.exports = router;
