

/* external import */
const express = require("express");

/* middleware imports */
const upload = require("../middleware/upload.middleware");

/* internal import */
const faqsController = require("../controllers/faqs.controller");
const verify = require("../middleware/verify.middleware");
const authorize = require("../middleware/authorize.middleware");

/* router level connection */
const router = express.Router();

/* router methods integration */

// add new faqs
router.post(
  "/add-faq",
  verify,
  authorize("superAdmin","admin"),
  faqsController.addFaqs
);

// get all faqses
router.get("/get-faqs", faqsController.getFaqs);

// get a faqs
router.get("/get-faq/:id", faqsController.getFaq);

// update faqs
router.patch(
  "/update-faqs/:id",
  verify,
  authorize("superAdmin","admin"),
  faqsController.updateFaqs
);

// delete faqs
router.delete(
  "/delete-faqs/:id",
  verify,
  authorize("superAdmin","admin"),

  faqsController.deleteFaqs
);

module.exports = router;
