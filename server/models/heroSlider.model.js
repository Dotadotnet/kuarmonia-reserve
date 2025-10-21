const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const Counter = require("./counter");
const baseSchema = require("./baseSchema.model");

const heroSliderSchema = new mongoose.Schema(
  {
    heroSliderId: { type: Number, unique: true },
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
    translations: [
      {
        translation: {
          type: ObjectId,
          ref: "Translation"
        },
        language: String
      }
    ],
    ...baseSchema.obj
  },
  { 
    timestamps: true,
    strict: true  // Enable strict mode to prevent adding undefined fields
  }
);

heroSliderSchema.pre("save", async function (next) {
  try {
    const counter = await Counter.findOneAndUpdate(
      { name: "heroSliderId" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    this.heroSliderId = counter.seq;
    next();
  } catch (error) {
    console.error(
      "Error setting heroSliderId:",
      error
    );
    next(error);
  }
});

module.exports = mongoose.model("HeroSlider", heroSliderSchema);