

/* external import */
const express = require("express");

/* middleware imports */
const upload = require("../middleware/upload.middleware");

/* internal import */
const newsCountryController = require("../controllers/newsCountry.controller");
const verify = require("../middleware/verify.middleware");
const authorize = require("../middleware/authorize.middleware");
const localeMiddleware = require("../middleware/locale.middleware");

/* router level connection */
const router = express.Router();

/* router methods integration */

// add new newsCountry
router.post(
  "/add-newsCountry",
  verify,
  authorize("admin", "superAdmin"),
  newsCountryController.addNewsCountry
);

// get all newsCountrys
router.get("/get-newsCountries",localeMiddleware, newsCountryController.getNewsCountries);

// get a newsCountry
router.get("/get-newsCountry/:id", newsCountryController.getNewsCountry);

// update newsCountry
router.patch(
  "/update-newsCountry/:id",
  verify,
  authorize("admin", "superAdmin"),
  newsCountryController.updateNewsCountry
);

// delete newsCountry
router.delete(
  "/delete-newsCountry/:id",
  verify,
  authorize("admin", "superAdmin"),
  newsCountryController.deleteNewsCountry
);

module.exports = router;
