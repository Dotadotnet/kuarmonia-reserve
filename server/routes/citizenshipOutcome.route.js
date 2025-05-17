/* external import */
const express = require("express");

/* middleware imports */

/* internal import */
const citizenshipOutcomeController = require("../controllers/citizenshipOutcome.controller");
const verify = require("../middleware/verify.middleware");
const authorize = require("../middleware/authorize.middleware");
const localeMiddleware = require("../middleware/locale.middleware");

const router = express.Router();


router.post(
  "/add-citizenshipOutcome",
  verify,
  authorize("superAdmin", "admin"),
  citizenshipOutcomeController.addCitizenshipOutcome
);

router.get("/get-citizenshipOutcomes", localeMiddleware, citizenshipOutcomeController.getCitizenshipOutcomes);

router.get("/get-citizenshipOutcome/:id", citizenshipOutcomeController.getCitizenshipOutcome);

router.patch(
  "/update-citizenshipOutcome/:id",
  verify,
  authorize("superAdmin", "admin"),
  citizenshipOutcomeController.updateCitizenshipOutcome
);

router.delete(
  "/delete-citizenshipOutcome/:id",
  verify,
  authorize("superAdmin", "admin"),

  citizenshipOutcomeController.deleteCitizenshipOutcome
);

module.exports = router;
