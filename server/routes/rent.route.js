/* external import */
const express = require("express");

/* middleware imports */
const upload = require("../middleware/upload.middleware");

/* internal import */
const rentController = require("../controllers/rent.controller");
const verify = require("../middleware/verify.middleware");
const authorize = require("../middleware/authorize.middleware");
const localeMiddleware = require("../middleware/locale.middleware");

/* router level connection */
const router = express.Router();

/* router methods integration */

// add new rent
router.post(
  "/add-rent",
  verify,
  authorize("admin", "superAdmin"),
  upload("rent").fields([
    { name: "gallery", maxCount: 10 }
  ]),
  rentController.addRent
);

// get all rents
router.get("/get-rents", localeMiddleware, rentController.getRents);

// get a rent
router.get("/get-rent/:id", rentController.getRent);

// update rent
router.patch(
  "/update-rent/:id",
  verify,
  authorize("admin", "seller"),
  upload("rent").single("logo"),
  rentController.updateRent
);

// delete rent
router.delete(
  "/delete-rent/:id",
  verify,
  authorize("admin", "superAdmin"),
  rentController.deleteRent
);

module.exports = router;
