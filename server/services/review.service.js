/* internal imports */
const Review = require("../models/review.model");
const User = require("../models/user.model");
const Session = require("../models/session.model");
const modelsMap = {
  property: require("../models/property.model"),
  rent: require("../models/rent.model"),
  news: require("../models/news.model"),
  opportunity: require("../models/opportunity.model")
};
const dynamicImportModel = require("../utils/dynamicImportModel")

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

  const TargetModel = dynamicImportModel(targetType);

  if (!TargetModel) {
    return res.status(400).json({
      acknowledgement: false,
      message: "Invalid Type",
      description: "نوع هدف نامعتبر است"
    });
  }

  // بررسی وجود هدف (مثلاً محصول یا رنت)

  const exists = await TargetModel.exists({
    _id: targetId,
  });


  if (!exists) {
    return res.status(400).json({
      acknowledgement: false,
      message: "Not Found",
      description: "هدف یافت نشد"
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

  await TargetModel.findByIdAndUpdate(targetId, {
    $push: { reviews: review._id }
  });

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
exports.getReviews = async (res) => {
  const reviews = await Review.find().sort({ updatedAt: 1 });

  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "Review fetched successfully",
    data: reviews
  });
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

  await Product.findByIdAndUpdate(review.product, {
    $pull: { reviews: review._id }
  });

  await User.findByIdAndUpdate(review.reviewer, {
    $pull: { reviews: review._id }
  });

  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "Review deleted successfully"
  });
};
