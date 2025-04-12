

/* external import */
const express = require("express");

/* middleware imports */
const upload = require("../middleware/upload.middleware");

/* internal import */
const socialLinkController = require("../controllers/socialLink.controller");
const verify = require("../middleware/verify.middleware");
const authorize = require("../middleware/authorize.middleware");

/* router level connection */
const router = express.Router();

/* router methods integration */

// add new socialLink
router.post(
  "/add-socialLink",
  verify,
  authorize("superAdmin","admin"),
  socialLinkController.addSocialLink
);

// get all socialLinks
router.get("/get-socialLinks", socialLinkController.getCategories);
router.get("/get-socialLinks-with-products", socialLinkController.getProductCategories);

// get a socialLink
router.get("/get-socialLink/:id", socialLinkController.getSocialLink);

// update socialLink
router.patch(
  "/update-socialLink/:id",
  verify,
  authorize("superAdmin","admin"),
  upload('socialLink').single("thumbnail"),
  socialLinkController.updateSocialLink
);

// delete socialLink
router.delete(
  "/delete-socialLink/:id",
  verify,
  authorize("superAdmin","admin"),

  socialLinkController.deleteSocialLink
);

module.exports = router;
