const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const Counter = require("./counter");
const baseSchema = require("./baseSchema.model");

const promoBannerSchema = new mongoose.Schema(
  {
    bannerId: { type: Number, unique: true },

    translations: [
      {
        translation: { type: ObjectId, ref: "Translation", required: true },
        language: { type: String, enum: ["fa", "en", "tr"], required: true }
      }
    ],
  position: {
      type: Number,
      default: 1 // پیش‌فرض ۰ تا بتونی مرتب‌سازی کنی
    },
    thumbnail: {
      url: { type: String, default: "https://placehold.co/600x400.png" },
      public_id: { type: String, default: "N/A" }
    },

    stories: [
      {
        type: ObjectId,
        ref: "Story"
      }
    ],

    creator: { type: ObjectId, ref: "Admin" },

    ...baseSchema.obj
  },
  { timestamps: true }
);

promoBannerSchema.pre("save", async function (next) {
  if (!this.isNew || this.bannerId) return next();
  try {
    const counter = await Counter.findOneAndUpdate(
      { name: "bannerId" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    this.bannerId = counter.seq;
    next();
  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.model("PromoBanner", promoBannerSchema);
