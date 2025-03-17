

/* external import */
const express = require("express");

/* middleware imports */
const upload = require("../middleware/upload.middleware");

/* internal import */
const unitController = require("../controllers/unit.controller");
const verify = require("../middleware/verify.middleware");
const authorize = require("../middleware/authorize.middleware");

/* router level connection */
const router = express.Router();

/* router methods integration */

// add new unit
router.post(
  "/add-unit",
  verify,
  authorize("superAdmin", "admin"),
  unitController.addUnit
);

// get all units
router.get("/get-units", unitController.getUnits);

// get a unit
router.get("/get-unit/:id", unitController.getUnit);

// update unit
router.patch(
  "/update-unit/:id",
  verify,
  authorize("superAdmin", "admin"),
  upload('unit').single("logo"),
  unitController.updateUnit
);

// delete unit
router.delete(
  "/delete-unit/:id",
  verify,
  authorize("superAdmin", "admin"),
  unitController.deleteUnit
);

module.exports = router;
