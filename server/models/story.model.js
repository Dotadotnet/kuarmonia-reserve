const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const Counter = require("./counter");
const baseSchema = require("./baseSchema.model");

const storySchema = new mongoose.Schema(
  {
    storyId: { type: Number, unique: true },

    promoBanner: {
      type: ObjectId,
      ref: "PromoBanner",
      required: true
    },

    translations: [
      {
        translation: {
          type: ObjectId,
          ref: "Translation",
          required: true
        },
        language: {
          type: String,
          enum: ["fa", "en", "tr"],
          required: true
        }
      }
    ],

    media: {
      url: { type: String, default: "https://placehold.co/600x400.png" },
      type: { type: String, enum: ["image", "video"], default: "image" },
      public_id: { type: String, default: "N/A" }
    },

    caption: {
      type: String
    },

    creator: { type: ObjectId, ref: "Admin" },

    ...baseSchema.obj
  },
  { timestamps: true }
);

storySchema.pre("save", async function (next) {
  if (!this.isNew || this.storyId) return next();
  try {
    const counter = await Counter.findOneAndUpdate(
      { name: "storyId" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    this.storyId = counter.seq;
    next();
  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.model("Story", storySchema);
