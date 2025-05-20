/* external import */
const express = require("express");

/* middleware imports */
const upload = require("../middleware/upload.middleware");

/* internal import */
const opportunityController = require("../controllers/opportunity.controller");
const verify = require("../middleware/verify.middleware");
const authorize = require("../middleware/authorize.middleware");
const localeMiddleware = require("../middleware/locale.middleware");

/* router level connection */
const router = express.Router();

/* router methods integration */

// add new opportunity
router.post(
  "/add-opportunity",
  verify,

  authorize("admin", "superAdmin"),
  upload("opportunity").fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "employerImage", maxCount: 1 },
    { name: "gallery", maxCount: 10 }
  ]),
  opportunityController.addJobOpportunity
);

// get all opportunity
router.get(
  "/get-opportunities",
  localeMiddleware,
  opportunityController.getAllOpportunity
);
// get a opportunity
router.get(
  "/get-opportunity/:id",
  localeMiddleware,
  opportunityController.getOpportunity
);

// update opportunity
router.patch(
  "/update-opportunity/:id",
  verify,
  authorize("admin", "superAdmin"),
  opportunityController.updateOpportunity
);

// delete opportunity
router.delete(
  "/delete-opportunity/:id",
  verify,
  authorize("admin", "superAdmin"),
  opportunityController.deleteOpportunity
);

module.exports = router;
