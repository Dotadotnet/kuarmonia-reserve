
/* internal import */
const reviewService = require("../services/review.service");

/* add to review */
exports.addReview = async (req, res) => {
  try {
    await reviewService.addReview(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* get from review */
exports.getReviews = async (req, res) => {
  try {
    await reviewService.getReviews(res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* update review */
exports.updateReview = async (req, res) => {
  try {
    await reviewService.updateReview(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* delete review */
exports.deleteReview = async (req, res) => {
  try {
    await reviewService.deleteReview(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};
