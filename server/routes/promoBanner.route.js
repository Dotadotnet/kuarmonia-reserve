

/* external import */
const express = require("express");

/* middleware imports */
const upload = require("../middleware/upload.middleware");

/* internal import */
const bannerController = require("../controllers/promoBanner.controller");
const verify = require("../middleware/verify.middleware");
const authorize = require("../middleware/authorize.middleware");
const localeMiddleware = require("../middleware/locale.middleware");

/* router level connection */
const router = express.Router();

/* router methods integration */

// add new banner
router.post(
  "/add-banner",
  verify,
  authorize("superAdmin","admin"),
  upload("banner").single("thumbnail"),
  bannerController.addPromoBanner
);

// get all promoPromoBanners
router.get("/get-banners",localeMiddleware, bannerController.getbanners);

// get a banner
router.get("/get-banner/:id", bannerController.getPromoBanner);

// update banner
router.patch(
  "/update-banner/:id",
  verify,
  authorize("superAdmin","admin"),
  upload('banner').single("thumbnail"),
  bannerController.updatePromoBanner
);

// delete banner
router.delete(
  "/delete-banner/:id",
  verify,
  authorize("superAdmin","admin"),

  bannerController.deletePromoBanner
);

module.exports = router;
