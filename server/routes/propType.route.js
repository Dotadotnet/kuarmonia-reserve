

/* external import */
const express = require("express");


/* internal import */
const propTypeController = require("../controllers/propType.controller");
const verify = require("../middleware/verify.middleware");
const authorize = require("../middleware/authorize.middleware");

/* router level connection */
const router = express.Router();

/* router methods integration */

// add new propType
router.post(
  "/add-propType",
  verify,
  authorize("superAdmin", "admin"),
  propTypeController.addPropType
);

// get all propTypes
router.get("/get-propTypes", propTypeController.getPropTypes);

// get a propType
router.get("/get-propType/:id", propTypeController.getPropType);




router.patch(
  "/update-propType/:id",
  verify,
  authorize("superAdmin", "admin"),

  propTypeController.updatePropType
);

// delete propType
router.delete(
  "/delete-propType/:id",
  verify,
  authorize("superAdmin", "admin"),
  propTypeController.deletePropType
);

module.exports = router;
