/* external import */
const express = require("express");

/* middleware imports */
const upload = require("../middleware/upload.middleware");
const verify = require("../middleware/verify.middleware");
const authorize = require("../middleware/authorize.middleware");

/* internal import */
const uploadController = require("../controllers/upload.controller");

/* router level connection */
const router = express.Router();

/* router methods integration */

// add new upload
router.post(
  "/add-upload",
  verify,
  authorize("admin", "superAdmin"),
  upload('upload').fields([
    { name: "file", maxCount: 4 },
  ]),
  uploadController.addUpload
);

// delete upload
router.post(
  "/delete-upload",
  verify,
  authorize("admin", "superAdmin"),
  uploadController.deleteUpload
);

module.exports = router;