/* واردات خارجی */
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const Counter = require("./counter");
const baseSchema = require("./baseSchema.model");
const {
  generateSlug,
 } = require("../utils/translationUtils");

/* ایجاد اسکیمای دسته‌بندی */
const categorySchema = new mongoose.Schema(
  {
    categoryId: {
      type: Number,
      unique: true
    },
    title: {
      type: String,
      required: [true, "لطفاً نام دسته‌بندی را وارد کنید"],
      trim: true,
      unique: [true, "دسته‌بندی مشابه از قبل وجود دارد"],
      maxLength: [100, "عنوان شما باید حداکثر ۱۰۰ کاراکتر باشد"]
    },
    slug: {
      type: String,
      unique: true
    },
    icon: {
      type: String,
      required: false
    },
    thumbnail: {
      url: {
        type: String,
        default: "https://placehold.co/300x300.png"
      },
      public_id: {
        type: String,
        default: "N/A"
      }
    },
    description: {
      type: String,
      required: [true, "لطفاً توضیحات دسته‌بندی را وارد کنید"],
      trim: true,
      maxLength: [500, "توضیحات شما باید حداکثر ۵۰۰ کاراکتر باشد"]
    },
    canonicalUrl: {
      type: String,
      required: false,
      trim: true,
      validate: {
        validator: function (v) {
          return /^(https?:\/\/[^\s$.?#].[^\s]*)$/.test(v);
        },
        message: "URL معتبر نیست"
      }
    },
    creator: {
      type: ObjectId,
      ref: "Admin"
    },

    ...baseSchema.obj
  },
  { timestamps: true }
);

const defaultDomain = process.env.API;

categorySchema.pre("save", async function (next) {
  if (!this.isNew || this.categoryId) {
    return next();
  }
  if (this.isModified("title")) {
    this.slug = await generateSlug(this.title);
  }
  if (!this.canonicalUrl) {
    this.canonicalUrl = `${defaultDomain}/tags/${this.slug}`;
  }
  try {
    const counter = await Counter.findOneAndUpdate(
      { name: "categoryId" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    this.categoryId = counter.seq;
    next();
  } catch (error) {
    next(error);
  }
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
