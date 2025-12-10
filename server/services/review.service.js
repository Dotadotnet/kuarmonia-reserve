/* internal imports */
const Review = require("../models/review.model");
const User = require("../models/user.model");
const Session = require("../models/session.model");
exports.addReview = async (req, res) => {
  const user = await User.findById(req?.user?._id);
  const guest = await Session.findOne({ sessionId: req.sessionID });

  const { targetId, targetType, rating, comment } = req.body;

  if (!user && !guest) {
    return res.status(401).json({
      acknowledgement: false,
      message: "Unauthorized",
      description: "برای ثبت نظر وارد شوید یا از طریق سشن معتبر اقدام کنید"
    });
  }

  const review = await Review.create({
    reviewer: user?._id || null,
    guest: guest?.userId || req.sessionID ,
    targetId,
    targetType,
    rating,
    comment
  });

  // Don't need TargetModel since client handles targeting
  // Just save the review with target info

  if (user) {
    await User.findByIdAndUpdate(user._id, {
      $push: { reviews: review._id }
    });
  } else {
    await Session.findOneAndUpdate(
      { sessionId: guest.sessionId },
      { $push: { reviews: review._id } }
    );
  }

  res.status(201).json({
    acknowledgement: true,
    message: "Ok",
    description: "نظر با موفقیت ثبت شد",
    data: review
  });
};

/* get from review */
exports.getReviews = async (req, res) => {
  // Check if we're getting reviews for a specific target
  if (req.params && req.params.type && req.params.id) {
    // Filter by targetType and targetId
    const reviews = await Review.find({
      targetType: req.params.type,
      targetId: req.params.id
    }).sort({ updatedAt: -1 }); // Sort by newest first
    
    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "Reviews fetched successfully",
      data: reviews
    });
  } else {
    // Get all reviews (existing behavior)
    const reviews = await Review.find().sort({ updatedAt: -1 });
    
    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "All reviews fetched successfully",
      data: reviews
    });
  }
};

/* update review */
exports.updateReview = async (req, res) => {
  await Review.findByIdAndUpdate(req.params.id, req.body);

  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "Review updated successfully"
  });
};

/* delete review */
exports.deleteReview = async (req, res) => {
  const review = await Review.findByIdAndDelete(req.params.id);

  // Remove review from the target model
  if (review && review.targetType && review.targetId) {
    const TargetModel = modelsMap[review.targetType];
    if (TargetModel) {
      await TargetModel.findByIdAndUpdate(review.targetId, {
        $pull: { reviews: review._id }
      });
    }
  }

  // Remove from User if reviewer exists
  if (review.reviewer) {
    await User.findByIdAndUpdate(review.reviewer, {
      $pull: { reviews: review._id }
    });
  }

  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "Review deleted successfully"
  });
};