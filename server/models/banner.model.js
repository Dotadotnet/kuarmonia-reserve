const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const Counter = require("./counter");
const baseSchema = require("./baseSchema.model");

const bannerSchema = new mongoose.Schema(
  {
    bannerId: { type: Number, unique: true },
    image: {
      url: { type: String, default: "https://placehold.co/600x400.png" },
      public_id: { type: String, default: "N/A" }
    },
    link: {
      type: String,
      required: false,
      nullable: true,
      default: null,
      trim: true
    },
    ...baseSchema.obj
  },
  { timestamps: true }
);



bannerSchema.pre("save", async function (next) {
  try {
    const counter = await Counter.findOneAndUpdate(
      { name: "bannerId" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    this.bannerId = counter.seq;
    next();
  } catch (error) {
    console.error(
      "خطا در تنظیم metaTitle، metaDescription و canonicalUrl:",
      error
    );
    next(error);
  }
});

module.exports = mongoose.model("Banner", bannerSchema);
