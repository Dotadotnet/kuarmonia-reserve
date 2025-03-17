

/* external import */
const express = require("express");

/* middleware imports */
const upload = require("../middleware/upload.middleware");

/* internal import */
const galleryController = require("../controllers/gallery.controller");
const verify = require("../middleware/verify.middleware");
const authorize = require("../middleware/authorize.middleware");

/* router level connection */
const router = express.Router();

/* router methods integration */

// add new gallery
router.post(
  "/add-gallery",
  verify,
  authorize("superAdmin", "admin"),
  upload('gallery').fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "gallery", maxCount: 10 },
  ]),
  galleryController.addGallery
);

// get all gallerys
router.get("/get-galleries", galleryController.getGalleries);


router.get("/get-first-gallery", galleryController.getFirstGallery);

// get a gallery
router.get("/get-gallery/:id", galleryController.getGallery);

// update gallery
router.patch(
  "/update-gallery/:id",
  verify,
  authorize("superAdmin", "admin"),
  upload('gallery').single("logo"),
  galleryController.updateGallery
);

// delete gallery
router.delete(
  "/delete-gallery/:id",
  verify,
  authorize("superAdmin", "admin"),
  galleryController.deleteGallery
);

module.exports = router;
