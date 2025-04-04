

/* external import */
const express = require("express");

/* middleware imports */
const upload = require("../middleware/upload.middleware");

/* internal import */
const venueAwardController = require("../controllers/venueAward.controller");
const verify = require("../middleware/verify.middleware");
const authorize = require("../middleware/authorize.middleware");

/* router level connection */
const router = express.Router();

/* router methods integration */

// add new venueAward
router.post(
  "/add-venueAward",
  verify,
  authorize("admin", "superAdmin"),
  upload('venueaward').single("thumbnail"),
  venueAwardController.addVenueAward
);

// get all venueAwards
router.get("/get-venueAwards", venueAwardController.getVenueAwards);

// get a venueAward
router.get("/get-venueAward/:id", venueAwardController.getVenueAward);

// update venueAward
router.patch(
  "/update-venueAward/:id",
  verify,
  authorize("admin", "seller"),
  upload('venueAward').single("logo"),
  venueAwardController.updateVenueAward
);

// delete venueAward
router.delete(
  "/delete-venueAward/:id",
  verify,
  authorize("admin", "superAdmin"),
  venueAwardController.deleteVenueAward
);

module.exports = router;
