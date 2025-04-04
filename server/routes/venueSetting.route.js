

/* external import */
const express = require("express");


/* internal import */
const venueSettingController = require("../controllers/venueSetting.controller");
const verify = require("../middleware/verify.middleware");
const authorize = require("../middleware/authorize.middleware");

/* router level connection */
const router = express.Router();

/* router methods integration */

// add new venueSetting
router.post(
  "/add-venueSetting",
  verify,
  authorize("admin", "superAdmin"),
  venueSettingController.addVenueSetting
);

// get all venueSettings
router.get("/get-venueSettings", venueSettingController.getVenueSettings);

// get a venueSetting
router.get("/get-venueSetting/:id", venueSettingController.getVenueSetting);

// update venueSetting
router.patch(
  "/update-venueSetting/:id",
  verify,
  authorize("admin", "seller"),
  venueSettingController.updateVenueSetting
);

// delete venueSetting
router.delete(
  "/delete-venueSetting/:id",
  verify,
  authorize("superAdmin", "admin"),
  venueSettingController.deleteVenueSetting
);

module.exports = router;
