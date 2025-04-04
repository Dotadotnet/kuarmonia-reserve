

/* external import */
const express = require("express");

/* middleware imports */
const upload = require("../middleware/upload.middleware");

/* internal import */
const venueServiceController = require("../controllers/venueService.controller");
const verify = require("../middleware/verify.middleware");
const authorize = require("../middleware/authorize.middleware");

/* router level connection */
const router = express.Router();

/* router methods integration */

// add new venueService
router.post(
  "/add-venueService",
  verify,
  authorize("admin", "superAdmin"),
  venueServiceController.addVenueService
);

// get all venueServices
router.get("/get-venueServices", venueServiceController.getVenueServices);

// get a venueService
router.get("/get-venueService/:id", venueServiceController.getVenueService);

// update venueService
router.patch(
  "/update-venueService/:id",
  verify,
  authorize("admin", "seller"),
  venueServiceController.updateVenueService
);

// delete venueService
router.delete(
  "/delete-venueService/:id",
  verify,
  authorize("superAdmin", "admin"),
  venueServiceController.deleteVenueService
);

module.exports = router;
