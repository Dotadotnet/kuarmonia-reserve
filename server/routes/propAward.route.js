

/* external import */
const express = require("express");

/* middleware imports */
const upload = require("../middleware/upload.middleware");

/* internal import */
const propAwardController = require("../controllers/propAward.controller");
const verify = require("../middleware/verify.middleware");
const authorize = require("../middleware/authorize.middleware");

/* router level connection */
const router = express.Router();

/* router methods integration */

// add new propAward
router.post(
  "/add-propAward",
  verify,
  authorize("admin", "superAdmin"),
  upload('propaward').single("thumbnail"),
  propAwardController.addPropAward
);

// get all propAwards
router.get("/get-propAwards", propAwardController.getPropAwards);

// get a propAward
router.get("/get-propAward/:id", propAwardController.getPropAward);

// update propAward
router.patch(
  "/update-propAward/:id",
  verify,
  authorize("admin", "seller"),
  upload('propAward').single("logo"),
  propAwardController.updatePropAward
);

// delete propAward
router.delete(
  "/delete-propAward/:id",
  verify,
  authorize("admin", "superAdmin"),
  propAwardController.deletePropAward
);

module.exports = router;
