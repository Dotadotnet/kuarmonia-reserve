

/* external import */
const express = require("express");

/* middleware imports */
const upload = require("../middleware/upload.middleware");

/* internal import */
const visaTypeController = require("../controllers/visaType.controller");
const verify = require("../middleware/verify.middleware");
const authorize = require("../middleware/authorize.middleware");
const localeMiddleware = require("../middleware/locale.middleware");

/* router level connection */
const router = express.Router();

/* router methods integration */
console.log("🚀 ~ file: visaType.route.js:11 ~ router methods integration");
// add new visaType
router.post(
  "/add-visaType",
  verify,
  upload("visatype").single("thumbnail"),
  authorize("admin", "superAdmin"),
  visaTypeController.addVisaType
);

// get all visaTypes
router.get("/get-visaTypes",localeMiddleware, visaTypeController.getVisaTypes);

// get a visaType
router.get("/get-visaType/:id", visaTypeController.getVisaType);

// update visaType
router.patch(
  "/update-visaType/:id",
  verify,
  authorize("admin", "superAdmin"),
  visaTypeController.updateVisaType
);

// delete visaType
router.delete(
  "/delete-visaType/:id",
  verify,
  authorize("admin", "superAdmin"),
  visaTypeController.deleteVisaType
);

module.exports = router;
