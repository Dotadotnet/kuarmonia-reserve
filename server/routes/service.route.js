

/* external import */
const express = require("express");

/* middleware imports */
const upload = require("../middleware/upload.middleware");

/* internal import */
const serviceController = require("../controllers/service.controller");
const verify = require("../middleware/verify.middleware");
const authorize = require("../middleware/authorize.middleware");

/* router level connection */
const router = express.Router();

/* router methods integration */

// add new service
router.post(
  "/add-service",
  verify,
  authorize("admin", "superAdmin"),
  upload('service').fields([
    { name: "thumbnail", maxCount: 1 },
  ]),
  serviceController.addService
);

// get all service
router.get(
  "/get-services",
  serviceController.getAllService
);
// get a service
router.get("/get-service/:id", serviceController.getService);

// update service
router.patch(
  "/update-service/:id",
  verify,
  authorize("admin", "superAdmin"),
  serviceController.updateService
);

// delete service
router.delete(
  "/delete-service/:id",
  verify,
  authorize("admin", "superAdmin"),
  serviceController.deleteService
);

module.exports = router;
