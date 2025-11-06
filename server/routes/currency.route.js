/* external import */
const express = require("express");

/* middleware imports */
const upload = require("../middleware/upload.middleware");

/* internal import */
const currencyController = require("../controllers/currency.controller");
const verify = require("../middleware/verify.middleware");
const authorize = require("../middleware/authorize.middleware");
const localeMiddleware = require("../middleware/locale.middleware");

/* router level connection */
const router = express.Router();

/* router methods integration */

// add new currency
router.post(
  "/add-currency",
  verify,
  authorize("superAdmin", "admin"),
  currencyController.addCurrency
);

// get all currencies
router.get("/get-currencies", localeMiddleware, currencyController.getCurrencies);

// get a currency
router.get("/get-currency/:id", localeMiddleware, currencyController.getCurrency);

// update currency
router.patch(
  "/update-currency/:id",
  verify,
  authorize("superAdmin", "admin"),
  upload('currency').single("logo"),
  currencyController.updateCurrency
);

// delete currency
router.delete(
  "/delete-currency/:id",
  verify,
  authorize("superAdmin", "admin"),
  currencyController.deleteCurrency
);

module.exports = router;