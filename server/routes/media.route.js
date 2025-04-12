

/* external import */
const express = require("express");

/* middleware imports */
const upload = require("../middleware/upload.middleware");

/* internal import */
const mediaController = require("../controllers/media.controller");
const verify = require("../middleware/verify.middleware");
const authorize = require("../middleware/authorize.middleware");

/* router level connection */
const router = express.Router();

/* router methods integration */
    
// add new media
router.post(
  "/add-media",
  verify,
  authorize("superAdmin", "admin"),
  upload('media').fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "gallery", maxCount: 10 },
  ]),
  mediaController.addMedia
);

// get all medias
router.get("/get-medias", mediaController.getMedias);

// get a media
router.get("/get-media/:id", mediaController.getMedia);

router.get("/get-by-id/:id", mediaController.getMediaById);

// update media
router.patch(
  "/update-media/:id",
  verify,
  authorize("superAdmin", "admin"),
  upload('media').single("logo"),
  mediaController.updateMedia
);

// delete media
router.delete(
  "/delete-media/:id",
  verify,
  authorize("superAdmin", "admin"),
  mediaController.deleteMedia
);

module.exports = router;
