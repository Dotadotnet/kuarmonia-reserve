/* external imports */
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const baseSchema = require("./baseSchema.model");
const Counter = require("./counter.model"); 

const viewSchema = new mongoose.Schema(
  {
    viewId: {
      type: Number,
      unique: true,
    },
    viewer: {
      type: ObjectId,
      refPath: 'viewerType', 
    },
    viewerType: { 
      type: String, 
      enum: ['User', 'Session'], 
      required: true
    },
    product: {
      type: ObjectId,
      ref: "Product",
    },
    venue: {
      type: ObjectId,
      ref: "Venue",
    },
    post: {
      type: ObjectId,
      ref: "Post",
    },
    blog: {
      type: ObjectId,
      ref: "Blog",
    },
    news: {
      type: ObjectId,
      ref: "News",
    },
    property: {
      type: ObjectId,
      ref: "Property",
    },
    ...baseSchema.obj
  },
  { timestamps: true }
);

// Pre-save hook to handle auto-increment of viewId
viewSchema.pre("save", async function (next) {
  if (!this.isNew || this.viewId) {
    return next(); 
  }

  try {
    const counter = await Counter.findOneAndUpdate(
      { name: "ViewId" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true } 
    );

    this.viewId = counter.seq; 
    next();
  } catch (error) {
    next(error);
  }
});

const View = mongoose.model("View", viewSchema);

module.exports = View;
