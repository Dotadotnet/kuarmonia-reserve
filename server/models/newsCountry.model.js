/* External Imports */
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const baseSchema = require("./baseSchema.model");
const Counter = require("./counter");
const { generateSlug } = require("../utils/translationUtils");
const newsCountrySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "نام کشور خبر الزامی است"],
      unique: true,
      trim: true,
      minLength: [3, "نام کشور خبر باید حداقل ۳ کاراکتر باشد"],
      maxLength: [50, "نام کشور خبر نمی‌تواند بیشتر از ۵۰ کاراکتر باشد"]
    },

    translations: [
      {
        translationId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Translation",
          required: true
        },
        language: {
          type: String,
          enum: ["en", "tr", "ar"], 
          required: true
        }
      }
    ],
    slug: {
      type: String,
      unique: true
    },
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
    if (this.isModified("title") || this.isNew) {
      this.slug = await generateSlug(this.title);
    }
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
