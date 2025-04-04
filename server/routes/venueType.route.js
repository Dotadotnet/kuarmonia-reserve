

/* external import */
const express = require("express");

/* middleware imports */
const upload = require("../middleware/upload.middleware");

/* internal import */
const venueTypeController = require("../controllers/venueType.controller");
const verify = require("../middleware/verify.middleware");
const authorize = require("../middleware/authorize.middleware");

/* router level connection */
const router = express.Router();

/* router methods integration */

// add new venueType
router.post(
  "/add-venueType",
  verify,
  authorize("admin", "superAdmin"),
  venueTypeController.addVenueType
);

// get all venueTypes
router.get(
  "/get-venueTypes",
  venueTypeController.getVenueTypes
);
// get a venueType
router.get("/get-venueType/:id", venueTypeController.getVenueType);

// update venueType
router.patch(
  "/update-venueType/:id",
  verify,
  authorize("admin", "superAdmin"),
  venueTypeController.updateVenueType
);

// delete venueType
router.delete(
  "/delete-venueType/:id",
  verify,
  authorize("admin", "superAdmin"),
  venueTypeController.deleteVenueType
);

module.exports = router;
