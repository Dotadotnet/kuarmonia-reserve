/* external import */
const express = require("express");

/* middleware imports */

/* internal import */
const experienceLevelController = require("../controllers/experienceLevel.controller");
const verify = require("../middleware/verify.middleware");
const authorize = require("../middleware/authorize.middleware");
const localeMiddleware = require("../middleware/locale.middleware");

const router = express.Router();


router.post(
  "/add-experienceLevel",
  verify,
  authorize("superAdmin", "admin"),
  experienceLevelController.addExperienceLevel
);

router.get("/get-experienceLevels", localeMiddleware, experienceLevelController.getExperienceLevels);

router.get("/get-experienceLevel/:id", experienceLevelController.getExperienceLevel);

router.patch(
  "/update-experienceLevel/:id",
  verify,
  authorize("superAdmin", "admin"),
  experienceLevelController.updateExperienceLevel
);

router.delete(
  "/delete-experienceLevel/:id",
  verify,
  authorize("superAdmin", "admin"),

  experienceLevelController.deleteExperienceLevel
);

module.exports = router;
