

/* external import */
const express = require("express");

/* middleware imports */
const upload = require("../middleware/upload.middleware");

/* internal import */
const venueController = require("../controllers/venue.controller");
const verify = require("../middleware/verify.middleware");
const authorize = require("../middleware/authorize.middleware");

/* router level connection */
const router = express.Router();

/* router methods integration */

// add new venue
router.post(
  "/add-venue",
  verify,
  authorize("admin", "superAdmin"),
  upload('venue').single("thumbnail"),
  venueController.addVenue
);

// get all venues
router.get("/get-venues", venueController.getVenues);

// get a venue
router.get("/get-venue/:id", venueController.getVenue);

// update venue
router.patch(
  "/update-venue/:id",
  verify,
  authorize("admin", "seller"),
  upload('venue').single("logo"),
  venueController.updateVenue
);

// delete venue
router.delete(
  "/delete-venue/:id",
  verify,
  authorize("admin", "seller"),
  venueController.deleteVenue
);

module.exports = router;
