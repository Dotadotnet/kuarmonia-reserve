

/* external import */
const express = require("express");

/* middleware imports */
const upload = require("../middleware/upload.middleware");

/* internal import */
const propertyController = require("../controllers/property.controller");
const verify = require("../middleware/verify.middleware");
const authorize = require("../middleware/authorize.middleware");

/* router level connection */
const router = express.Router();

/* router methods integration */

// add new property
router.post(
  "/add-property",
  verify,
  authorize("superAdmin", "admin"),
  upload('property').fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "gallery", maxCount: 10 },
  ]),
  propertyController.addProperty
);


// get all propertys
router.get("/get-properties", propertyController.getProperties);

// get a property
router.get("/get-property/:id", propertyController.getProperty);

// update property
router.get("/get-by-id/:id", propertyController.getPropertyById);


router.patch(
  "/update-property/:id",
  verify,
  authorize("superAdmin", "admin"),
  upload('property').single("logo"),
  propertyController.updateProperty
);

// delete property
router.delete(
  "/delete-property/:id",
  verify,
  authorize("superAdmin", "admin"),
  propertyController.deleteProperty
);

module.exports = router;
