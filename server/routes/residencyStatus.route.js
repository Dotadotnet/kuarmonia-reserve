/* external import */
const express = require("express");

/* middleware imports */

/* internal import */
const residencyStatusController = require("../controllers/residencyStatus.controller");
const verify = require("../middleware/verify.middleware");
const authorize = require("../middleware/authorize.middleware");
const localeMiddleware = require("../middleware/locale.middleware");

const router = express.Router();


router.post(
  "/add-residencyStatus",
  verify,
  authorize("superAdmin", "admin"),
  residencyStatusController.addResidencyStatus
);

router.get("/get-residencyStatuss", localeMiddleware, residencyStatusController.getResidencyStatuss);

router.get("/get-residencyStatus/:id", residencyStatusController.getResidencyStatus);

router.patch(
  "/update-residencyStatus/:id",
  verify,
  authorize("superAdmin", "admin"),
  residencyStatusController.updateResidencyStatus
);

router.delete(
  "/delete-residencyStatus/:id",
  verify,
  authorize("superAdmin", "admin"),

  residencyStatusController.deleteResidencyStatus
);

module.exports = router;
