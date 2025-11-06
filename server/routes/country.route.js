const express = require("express");
const verify = require("../middleware/verify.middleware");
const authorize = require("../middleware/authorize.middleware");
const localeMiddleware = require("../middleware/locale.middleware");
const countryController = require("../controllers/country.controller");

const router = express.Router();

router.post("/add-country", verify, authorize("admin", "superAdmin"), countryController.addCountry);
router.get("/get-countries", localeMiddleware, countryController.getCountries);
router.get("/get-country/:id", localeMiddleware, countryController.getCountry);
router.patch("/update-country/:id", verify, authorize("admin", "superAdmin"), countryController.updateCountry);
router.delete("/delete-country/:id", verify, authorize("admin", "superAdmin"), countryController.deleteCountry);

module.exports = router;











