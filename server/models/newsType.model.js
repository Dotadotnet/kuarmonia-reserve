const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const baseSchema = require("./baseSchema.model");
const Counter = require("./counter");

const newsTypeSchema = new mongoose.Schema(
  {
    title: {
      fa: { type: String, required: [true, "عنوان فارسی الزامی است"], minlength: [3], maxlength: [100] },
      en: { type: String, default: "" },
      tr: { type: String, default: "" },
      ar: { type: String, default: "" }
    },
    
    // Summary with multilingual support
    summary: {
      fa: { type: String, required: [true, "خلاصه فارسی الزامی است"], minlength: [10], maxlength: [500] },
      en: { type: String, default: "" },
      tr: { type: String, default: "" },
      ar: { type: String, default: "" }
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