// faq.model.js
const mongoose = require("mongoose");
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const Counter = require("./counter");
const baseSchema = require("./baseSchema.model");

const faqSchema = new Schema(
  {
    faqId: {
      type: Number,
      unique: true
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
              enum: ["en", "tr", "ar"], // هر زبانی که ساپورت می‌کنی
              required: true
            }
          }
        ],    
    question: {
      type: String,
      required: [true, "لطفاً سوال را وارد کنید"],
      unique: [true, "سوال مشابه از قبل وجود دارد"],
      trim: true,
      minLength: [3, "سوال باید حداقل ۳ کاراکتر باشد"],
      maxLength: [160, "سوال نمی‌تواند بیشتر از ۱۶۰ کاراکتر باشد"]
    },
    answer: {
      type: String,
      required: [true, "لطفاً پاسخ را وارد کنید"],
      unique: [true, "پاسخ مشابه از قبل وجود دارد"],
      trim: true,
      minLength: [3, "پاسخ باید حداقل ۳ کاراکتر باشد"],
      maxLength: [160, "پاسخ نمی‌تواند بیشتر از ۱۶۰ کاراکتر باشد"]
    },
    tags: [
      {
        type: ObjectId,
        ref: "Tag",
        required: [true, "لطفاً تگ را وارد کنید"]
      }
    ],
    category: {
      type: ObjectId,
      ref: "Category",
      required: [true, "لطفاً دسته‌بندی را مشخص کنید"]
    },
    creator: {
      type: ObjectId,
      ref: "Admin",
      required: [true, "شناسه نویسنده الزامی است"]
    },
    ...baseSchema.obj
  },
  { timestamps: true }
);

// تولید مقدار auto-increment برای faqId
faqSchema.pre("save", async function (next) {
  if (this.isNew && !this.faqId) {
    try {
      const counter = await Counter.findOneAndUpdate(
        { name: "faqId" },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );
      this.faqId = counter.seq;
      next();
    } catch (err) {
      next(err);
    }
  } else {
    next();
  }
});

const Faq = mongoose.models.Faq || mongoose.model("Faq", faqSchema);

module.exports = Faq;
