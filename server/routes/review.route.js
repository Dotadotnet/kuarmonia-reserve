

/* external import */
const express = require("express");

/* middleware imports */
const authorize = require("../middleware/authorize.middleware");

/* internal import */
const reviewController = require("../controllers/review.controller");
const verify = require("../middleware/verify.middleware");

/* router level connection */
const router = express.Router();

/* router methods integration */

// add to review
router.post(
  "/add-review",
  reviewController.addReview
);

// get from review
router.get(
  "/get-reviews",
  reviewController.getReviews
);

// update review
router.patch(
  "/update-review/:id",
  verify,
  authorize("buyer"),
  reviewController.updateReview
);

router.get(
  "/get-reviews/:type/:id",
  reviewController.getReviews
);

// delete review
router.delete(
  "/delete-review/:id",
  verify,
  authorize("seller", "admin"),
  reviewController.deleteReview
);

/* export review router */
module.exports = router;
