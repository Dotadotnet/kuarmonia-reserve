

/* external import */
const express = require("express");


/* internal import */
const tradeTypeController = require("../controllers/tradeType.controller");
const verify = require("../middleware/verify.middleware");
const authorize = require("../middleware/authorize.middleware");

/* router level connection */
const router = express.Router();

/* router methods integration */

// add new tradeType
router.post(
  "/add-tradeType",
  verify,
  authorize("superAdmin", "admin"),
  tradeTypeController.addTradeType
);

// get all tradeTypes
router.get("/get-tradeTypes", tradeTypeController.getTradeTypes);

// get a tradeType
router.get("/get-tradeType/:id", tradeTypeController.getTradeType);




router.patch(
  "/update-tradeType/:id",
  verify,
  authorize("superAdmin", "admin"),

  tradeTypeController.updateTradeType
);

// delete tradeType
router.delete(
  "/delete-tradeType/:id",
  verify,
  authorize("superAdmin", "admin"),
  tradeTypeController.deleteTradeType
);

module.exports = router;
