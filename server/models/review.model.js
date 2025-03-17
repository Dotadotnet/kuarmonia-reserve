

/* external imports */
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const baseSchema = require("./baseSchema.model");
/* create review schema */
const reviewSchema = new mongoose.Schema(
  {
    reviewId: {
      type: Number,
      unique: true,
    },
    // for reviewer
    reviewer: {
      type: ObjectId,
      ref: "User",
    },

    // for product
    product: {
      type: ObjectId,
      ref: "Product",
    },

    // for rating
    rating: {
      type: Number,
      required: [true, "Please, provide a rating"],
      min: 1,
      max: 5,
    },

    // for comment
    comment: {
      type: String,
      required: [true, "Please, provide a comment"],
      maxLength: [200, "Your comment should be at most 200 characters"],
    },
    ...baseSchema.obj
  },
  { timestamps: true }
);

reviewSchema.pre("save", async function (next) {
  if (!this.isNew || this.reviewId) {
    return next(); 
  }

  try {
    const counter = await Counter.findOneAndUpdate(
      { name: "reviewId" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true } 
    );

    this.reviewId = counter.seq; 
    next();
  } catch (error) {
    next(error);
  }
}); 


/* create review model */
const Review = mongoose.model("Review", reviewSchema);

/* export Review model */
module.exports = Review;
