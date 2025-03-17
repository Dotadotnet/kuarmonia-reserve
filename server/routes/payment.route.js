

/* external import */
const express = require("express");

/* middleware imports */
const verify = require("../middleware/verify.middleware");
const authorize = require("../middleware/authorize.middleware");

/* internal import */
const paymentController = require("../controllers/payment.controller");

/* router level connection */
const router = express.Router();

/* router methods integration */

// create payment
router.post(
  "/create-payment",
  verify,
  authorize("buyer"),
  paymentController.createPayment
);

/* export router */
module.exports = router;
