/* external import */
const express = require("express");

/* middleware imports */
const upload = require("../middleware/upload.middleware");

/* internal import */
const serviceController = require("../controllers/service.controller");
const verify = require("../middleware/verify.middleware");
const authorize = require("../middleware/authorize.middleware");
const localeMiddleware = require("../middleware/locale.middleware");

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

// get all services with pagination and search
router.get(
  "/get-services",
  localeMiddleware,
  serviceController.getServices
);

// get all services without pagination (for dashboard)
router.get(
  "/get-all-services",
  localeMiddleware,
  serviceController.getAllServices
);

// get a service
router.get("/get-service/:id", localeMiddleware,
  serviceController.getService);


router.get("/get-serviceById/:id", localeMiddleware,
  serviceController.getServiceById);


// update service
router.patch(
  "/update-service/:id",
  verify,
  authorize("admin", "superAdmin"),
  upload('service').fields([
    { name: "thumbnail", maxCount: 1 },
  ]),
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