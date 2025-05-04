

/* external import */
const express = require("express");


/* internal import */
const saleTypeController = require("../controllers/saleType.controller");
const verify = require("../middleware/verify.middleware");
const authorize = require("../middleware/authorize.middleware");
const localeMiddleware = require("../middleware/locale.middleware");

/* router level connection */
const router = express.Router();

/* router methods integration */

// add new saleType
router.post(
  "/add-saleType",
  verify,
  authorize("superAdmin", "admin"),
  saleTypeController.addSaleType
);

// get all saleTypes
router.get("/get-saleTypes",localeMiddleware, saleTypeController.getSaleTypes);

// get a saleType
router.get("/get-saleType/:id", saleTypeController.getSaleType);




router.patch(
  "/update-saleType/:id",
  verify,
  authorize("superAdmin", "admin"),

  saleTypeController.updateSaleType
);

// delete saleType
router.delete(
  "/delete-saleType/:id",
  verify,
  authorize("superAdmin", "admin"),
  saleTypeController.deleteSaleType
);

module.exports = router;
