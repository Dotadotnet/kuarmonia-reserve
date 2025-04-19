/* External Imports */
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const baseSchema = require("./baseSchema.model");
const Counter = require("./counter");
const { generateSlug } = require("../utils/translationUtils");
const newsTypeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "نام نوع خبر محل جشن الزامی است"],
      unique: true,
      trim: true,
      minLength: [3, "نام نوع خبر محل جشن باید حداقل ۳ کاراکتر باشد"],
      maxLength: [50, "نام نوع خبر محل جشن نمی‌تواند بیشتر از ۵۰ کاراکتر باشد"]
    },
    description: {
      type: String,
      maxLength: [500, "توضیحات نمی‌تواند بیشتر از ۵۰۰ کاراکتر باشد"]
    },
    translationOf: {
      type: ObjectId,
      ref: "News",
      default: null
    },
    translations: [
      {
        type: ObjectId,
        ref: "News"
      }
    ],
    slug: {
      type: String,
      unique: true
    },
    icon: {
      type: String,
      required: false,
      description:
        "آیکون مربوط به نوع خبر محل جشن، می‌تواند شامل یک کد یونیکد یا URL آیکون باشد"
    },
    creator: {
      type: ObjectId,
      ref: "Admin",
      required: [true, "شناسه مدیر الزامی است"]
    },
    newsTypeId: {
      type: Number
    },
    ...baseSchema.obj
  },
  { timestamps: true }
);

newsTypeSchema.pre("save", async function (next) {
  try {
    if (this.isModified("title")) {
      this.slug = await generateSlug(this.title);
    }
    
    const counter = await Counter.findOneAndUpdate(
      { name: "newsTypeId" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    this.newsTypeId = counter.seq;
    next();
  } catch (error) {
    next(error);
  }
});

const NewsType = mongoose.model("NewsType", newsTypeSchema);

module.exports = NewsType;
