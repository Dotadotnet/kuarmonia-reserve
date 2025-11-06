/* external import */
const express = require("express");

/* middleware imports */
const upload = require("../middleware/upload.middleware");
const verify = require("../middleware/verify.middleware");
const authorize = require("../middleware/authorize.middleware");

/* internal import */
const requestController = require("../controllers/request.controller");

/* router level connection */
const router = express.Router();

/* router methods integration */

// create a new request
router.post(
  "/create",
  upload("requests").single("file"),
  requestController.createRequest
);

// get all requests
router.get(
  "/all",
  verify,
  authorize("superAdmin", "admin"),
  requestController.getRequests
);

// get single request
router.get(
  "/:id",
  verify,
  authorize("superAdmin", "admin"),
  requestController.getRequest
);

// update request status
router.patch(
  "/:id",
  verify,
  authorize("superAdmin", "admin"),
  requestController.updateRequest
);

// delete request
router.delete(
  "/:id",
  verify,
  authorize("superAdmin", "admin"),
  requestController.deleteRequest
);

/* export request router */
module.exports = router;