

/* external import */
const express = require("express");

/* middleware imports */
const upload = require("../middleware/upload.middleware");

/* internal import */
const visaController = require("../controllers/visa.controller");
const verify = require("../middleware/verify.middleware");
const authorize = require("../middleware/authorize.middleware");
const localeMiddleware = require("../middleware/locale.middleware");

/* router level connection */
const router = express.Router();

router.post(
  "/add-visa",
  verify,
  upload("visa").single("thumbnail"),
  authorize("admin", "superAdmin"),
  visaController.addVisa
);

// get all visas
router.get("/get-visas",localeMiddleware, visaController.getVisas);

// get a visa
router.get("/get-visa/:id", visaController.getVisa);

// update visa
router.patch(
  "/update-visa/:id",
  verify,
  authorize("admin", "superAdmin"),
  visaController.updateVisa
);

// delete visa
router.delete(
  "/delete-visa/:id",
  verify,
  authorize("admin", "superAdmin"),
  visaController.deleteVisa
);

module.exports = router;
