

/* external import */
const express = require("express");

/* middleware imports */
const upload = require("../middleware/upload.middleware");

/* internal import */
const venueVendorController = require("../controllers/venueVendor.controller");
const verify = require("../middleware/verify.middleware");
const authorize = require("../middleware/authorize.middleware");

/* router level connection */
const router = express.Router();

/* router methods integration */

// add new venueVendor
router.post(
  "/add-venueVendor",
  verify,
  authorize("admin", "superAdmin"),
  upload('venuevendor').single("thumbnail"),
  venueVendorController.addVenueVendor
);

// get all venueVendors
router.get("/get-venueVendors", venueVendorController.getVenueVendors);

// get a venueVendor
router.get("/get-venueVendor/:id", venueVendorController.getVenueVendor);

// update venueVendor
router.patch(
  "/update-venueVendor/:id",
  verify,
  authorize("admin", "seller"),
  upload('venueVendor').single("logo"),
  venueVendorController.updateVenueVendor
);

// delete venueVendor
router.delete(
  "/delete-venueVendor/:id",
  verify,
  authorize("admin", "superAdmin"),
  venueVendorController.deleteVenueVendor
);

module.exports = router;
