

/* external import */
const express = require("express");

/* middleware imports */
const upload = require("../middleware/upload.middleware");

/* internal import */
const venueAmenityController = require("../controllers/venueAmenity.controller");
const verify = require("../middleware/verify.middleware");
const authorize = require("../middleware/authorize.middleware");

/* router level connection */
const router = express.Router();

/* router methods integration */

// add new venueAmenity
router.post(
  "/add-venueAmenity",
  verify,
  authorize("admin", "superAdmin"),
  venueAmenityController.addVenueAmenity
);

// get all venueAmenitys
router.get("/get-venueAmenities", venueAmenityController.getVenueAmenities);

// get a venueAmenity
router.get("/get-venueAmenity/:id", venueAmenityController.getVenueAmenity);

// update venueAmenity
router.patch(
  "/update-venueAmenity/:id",
  verify,
  authorize("admin", "seller"),
  venueAmenityController.updateVenueAmenity
);

// delete venueAmenity
router.delete(
  "/delete-venueAmenity/:id",
  verify,
  authorize("admin", "superAdmin"),
  venueAmenityController.deleteVenueAmenity
);

module.exports = router;
