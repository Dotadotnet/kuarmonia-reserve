

/* external import */
const express = require("express");

/* middleware imports */
const upload = require("../middleware/upload.middleware");

/* internal import */
const newsController = require("../controllers/news.controller");
const verify = require("../middleware/verify.middleware");
const authorize = require("../middleware/authorize.middleware");
const localeMiddleware = require("../middleware/locale.middleware");

/* router level connection */
const router = express.Router();

/* router methods integration */

// add new news
router.post(
  "/add-news",
  verify,
  
  authorize("admin", "superAdmin"),
  upload('news').fields([
    { name: "thumbnail", maxCount: 1 },
  ]),
  newsController.addNews
);

// get all news
router.get(
  "/get-news",
  localeMiddleware,
  newsController.getAllNews
);
// get a news
router.get("/get-news/:id",localeMiddleware, newsController.getNews);

// update news
router.patch(
  "/update-news/:id",
  verify,
  authorize("admin", "superAdmin"),
  newsController.updateNews
);

// delete news
router.delete(
  "/delete-news/:id",
  verify,
  authorize("admin", "superAdmin"),
  newsController.deleteNews
);

module.exports = router;
