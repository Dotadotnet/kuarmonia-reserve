

/* external import */
const express = require("express");

/* middleware imports */
const verify = require("../middleware/verify.middleware");
const authorize = require("../middleware/authorize.middleware");

/* internal import */
const purchaseController = require("../controllers/purchase.controller");

/* router level connection */
const router = express.Router();

/* router methods integration */

// get all purchases
router.get(
  "/get-all-purchases",
  verify,
  authorize("admin"),
  purchaseController.getAllPurchases
);

// update purchase status
router.patch(
  "/update-purchase-status/:id",
  verify,
  authorize("admin"),
  purchaseController.updatePurchaseStatus
);

/* export purchase router */
module.exports = router;
