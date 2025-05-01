/* External Imports */
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const baseSchema = require("./baseSchema.model");
const Counter = require("./counter");
const newsCountrySchema = new mongoose.Schema(
  {
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

    code: {
      type: String,
      required: [true, "شناسه کشور الزامی است"],
      unique: true
    },
    icon: {
      type: String,
      required: false,
      description:
        "آیکون مربوط به کشور خبر، می‌تواند شامل یک کد یونیکد یا URL آیکون باشد"
    },
    creator: {
      type: ObjectId,
      ref: "Admin",
      required: [true, "شناسه مدیر الزامی است"]
    },
    newsCountryId: {
      type: Number
    },
    ...baseSchema.obj
  },
  { timestamps: true }
);

newsCountrySchema.pre("save", async function (next) {
  try {
    const counter = await Counter.findOneAndUpdate(
      { name: "newsCountryId" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    this.newsCountryId = counter.seq;
    next();
  } catch (error) {
    next(error);
  }
});

const NewsCountry = mongoose.model("NewsCountry", newsCountrySchema);

module.exports = NewsCountry;
