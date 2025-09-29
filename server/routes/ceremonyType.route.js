

/* external import */
const express = require("express");

/* middleware imports */
const upload = require("../middleware/upload.middleware");

/* internal import */
const ceremonyTypeController = require("../controllers/ceremonyType.controller");
const verify = require("../middleware/verify.middleware");
const authorize = require("../middleware/authorize.middleware");
const localeMiddleware = require("../middleware/locale.middleware");

/* router level connection */
const router = express.Router();

/* router methods integration */

// add new ceremonyType
router.post(
  "/add-ceremonyType",
  verify,
  authorize("admin", "superAdmin"),
  ceremonyTypeController.addCeremonyType
);


// get all ceremonyTypes
router.get(
  "/get-ceremonyTypes",
  localeMiddleware,
  ceremonyTypeController.getCeremonyTypes
);
// get a ceremonyType
router.get("/get-ceremonyType/:id",localeMiddleware, ceremonyTypeController.getCeremonyType);

// update ceremonyType
router.patch(
  "/update-ceremonyType/:id",
  verify,
  authorize("admin", "superAdmin"),
  ceremonyTypeController.updateCeremonyType
);

// delete ceremonyType
router.delete(
  "/delete-ceremonyType/:id",
  verify,
  authorize("admin", "superAdmin"),
  ceremonyTypeController.deleteCeremonyType
);

module.exports = router;
