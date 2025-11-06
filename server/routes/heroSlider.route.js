/* external import */
const express = require("express");
const localeMiddleware = require("../middleware/locale.middleware");

/* middleware imports */
const upload = require("../middleware/upload.middleware");

/* internal import */
const heroSliderController = require("../controllers/heroSlider.controller");
const verify = require("../middleware/verify.middleware");
const authorize = require("../middleware/authorize.middleware");

/* router level connection */
const router = express.Router();

/* router methods integration */
router.post(
  "/add-hero-slider",
  verify,
  authorize("superAdmin", "admin"),
  upload("hero-slider").single("media"),
  heroSliderController.addHeroSlider
);

router.get("/get-hero-sliders", localeMiddleware, heroSliderController.getHeroSliders);

router.get("/get-hero-slider/:id", localeMiddleware, heroSliderController.getHeroSlider);

router.patch(
  "/update-hero-slider/:id",
  verify,
  authorize("superAdmin", "admin"),
  upload("hero-slider").single("media"),
  heroSliderController.updateHeroSlider
);

// Add route for updating heroSlider IDs
router.patch(
  "/update-hero-slider-ids",
  verify,
  authorize("superAdmin", "admin"),
  heroSliderController.updateHeroSliderIds
);

router.delete(
  "/delete-hero-slider/:id",
  verify,
  authorize("superAdmin", "admin"),
  heroSliderController.deleteHeroSlider
);

module.exports = router;