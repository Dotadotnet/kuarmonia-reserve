

/* external import */
const express = require("express");

/* middleware imports */
const upload = require("../middleware/upload.middleware");

/* internal import */
const newsTypeController = require("../controllers/newsType.controller");
const verify = require("../middleware/verify.middleware");
const authorize = require("../middleware/authorize.middleware");
const localeMiddleware = require("../middleware/locale.middleware");

/* router level connection */
const router = express.Router();

/* router methods integration */

// add new newsType
router.post(
  "/add-newsType",
  verify,
  authorize("admin", "superAdmin"),
  newsTypeController.addNewsType
);

// get all newsTypes
router.get("/get-newsTypes",localeMiddleware, newsTypeController.getNewsTypes);

// get a newsType
router.get("/get-newsType/:id", newsTypeController.getNewsType);

// update newsType
router.patch(
  "/update-newsType/:id",
  verify,
  authorize("admin", "superAdmin"),
  newsTypeController.updateNewsType
);

// delete newsType
router.delete(
  "/delete-newsType/:id",
  verify,
  authorize("admin", "superAdmin"),
  newsTypeController.deleteNewsType
);

module.exports = router;
