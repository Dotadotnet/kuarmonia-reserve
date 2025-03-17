

/* external import */
const express = require("express");

/* middleware imports */
const verify = require("../middleware/verify.middleware");
const authorize = require("../middleware/authorize.middleware");

/* internal import */
const favoriteController = require("../controllers/favorite.controller");

/* router level connection */
const router = express.Router();

/* router methods integration */

// add to favorite
router.post(
  "/add-to-favorite",
  verify,
  authorize("buyer"),
  favoriteController.addToFavorite
);

// get favorites
router.get(
  "/get-favorites",
  verify,
  authorize("admin"),
  favoriteController.getFavorites
);

// delete from favorite
router.delete(
  "/delete-from-favorite/:id",
  verify,
  authorize("buyer"),
  favoriteController.deleteFromFavorite
);

/* export user router */
module.exports = router;
