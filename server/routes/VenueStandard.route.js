

/* external import */
const express = require("express");

/* middleware imports */
const upload = require("../middleware/upload.middleware");

/* internal import */
const venueStandardController = require("../controllers/venueStandard.controller");
const verify = require("../middleware/verify.middleware");
const authorize = require("../middleware/authorize.middleware");

/* router level connection */
const router = express.Router();

/* router methods integration */

// add new venueStandard
router.post(
  "/add-venueStandard",
  verify,
  authorize("admin", "superAdmin"),
  upload('venuestandard').single("thumbnail"),
  venueStandardController.addVenueStandard
);

// get all venueStandards
router.get("/get-venueStandards", venueStandardController.getVenueStandards);

// get a venueStandard
router.get("/get-venueStandard/:id", venueStandardController.getVenueStandard);

// update venueStandard
router.patch(
  "/update-venueStandard/:id",
  verify,
  authorize("admin", "seller"),
  upload('venuestandard').single("thumbnail"),
  venueStandardController.updateVenueStandard
);

// delete venueStandard
router.delete(
  "/delete-venueStandard/:id",
  verify,
  authorize("admin", "superAdmin"),
  venueStandardController.deleteVenueStandard
);

module.exports = router;
