/* external import */
const express = require("express");

/* middleware imports */
const verify = require("../middleware/verify.middleware");
const authorize = require("../middleware/authorize.middleware");

/* internal import */
const contactController = require("../controllers/contact.controller");

/* router level connection */
const router = express.Router();

/* router methods integration */

// create a new contact message
router.post(
  "/create",
  contactController.createContact
);

// get all contact messages
router.get(
  "/all",
  verify,
  authorize("superAdmin", "admin"),
  contactController.getContacts
);

// get single contact message
router.get(
  "/:id",
  verify,
  authorize("superAdmin", "admin"),
  contactController.getContact
);

// update contact message status
router.patch(
  "/:id",
  verify,
  authorize("superAdmin", "admin"),
  contactController.updateContact
);

// delete contact message
router.delete(
  "/:id",
  verify,
  authorize("superAdmin", "admin"),
  contactController.deleteContact
);

/* export contact router */
module.exports = router;