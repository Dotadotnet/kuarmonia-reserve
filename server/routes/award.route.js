

/* external import */
const express = require("express");

/* middleware imports */
const upload = require("../middleware/upload.middleware");

/* internal import */
const awardController = require("../controllers/award.controller");
const verify = require("../middleware/verify.middleware");
const authorize = require("../middleware/authorize.middleware");
const localeMiddleware = require("../middleware/locale.middleware");

/* router level connection */
const router = express.Router();

/* router methods integration */

// add new award
router.post(
  "/add-award",
  verify,
  authorize("admin", "superAdmin"),
  upload('propaward').single("thumbnail"),
  awardController.addAward
);

// get all awards
router.get("/get-awards",localeMiddleware, awardController.getAwards);

// get a award
router.get("/get-award/:id", awardController.getAward);

// update award
router.patch(
  "/update-award/:id",
  verify,
  authorize("admin", "seller"),
  upload('award').single("logo"),
  awardController.updateAward
);

// delete award
router.delete(
  "/delete-award/:id",
  verify,
  authorize("admin", "superAdmin"),
  awardController.deleteAward
);

module.exports = router;
