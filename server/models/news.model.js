const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const Category = require("./category.model");
const Counter = require("./counter");
const baseSchema = require("./baseSchema.model");

const newsSchema = new mongoose.Schema(
  {
    newsId: {
      type: Number,
      unique: true,
    },
    language: {
      type: String,
      enum: ["fa", "en"],
      default: "fa",
    },
    translationOf: {
      type: ObjectId,
      ref: "News",
      default: null,
    },
    translations: [
      {
        type: ObjectId,
        ref: "News",
      },
    ],
    title: {
      type: String,
      required: [true, "عنوان خبر الزامی است"],
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      default: function () {
        return this.title
          .toString()
          .trim()
          .toLowerCase()
          .replace(/[\u200B-\u200D\uFEFF]/g, "")
          .replace(/[\s\ـ]+/g, "-")
          .replace(/[^\u0600-\u06FFa-z0-9\-]/g, "")
          .replace(/-+/g, "-")
          .replace(/^-+|-+$/g, "");
      },
    },
    summary: {
      type: String,
      maxLength: [300, "خلاصه خبر نمی‌تواند بیشتر از ۳۰۰ کاراکتر باشد"],
      required: [true, "خلاصه خبر الزامی است"],
    },
    content: {
      type: String,
      required: [true, "متن خبر الزامی است"],
    },
    thumbnail: {
      url: { type: String, required: true },
      public_id: { type: String, default: "N/A" },
    },
    gallery: [
      {
        url: { type: String, default: "https://placehold.co/296x200.png" },
        public_id: { type: String, default: "N/A" },
      },
    ],
    metaTitle: {
      type: String,
      maxLength: [60, "متا تایتل نمی‌تواند بیشتر از ۶۰ کاراکتر باشد"],
    },
    metaDescription: {
      type: String,
      maxLength: [160, "متا توضیحات نمی‌تواند بیشتر از ۱۶۰ کاراکتر باشد"],
    },
    canonicalUrl: {
      type: String,
      trim: true,
      validate: {
        validator: function (v) {
          return /^(https?:\/\/[^\s$.?#].[^\s]*)$/.test(v);
        },
        message: "URL معتبر نیست",
      },
    },
    tags: [
      {
        type: ObjectId,
        ref: "Tag",
      },
    ],
    category: {
      type: ObjectId,
      ref: "Category",
      required: true,
    },
    creator: {
      type: ObjectId,
      ref: "Admin",
      required: true,
    },
    views: {
      type: Number,
      default: 0,
      min: [0, "تعداد بازدید نمی‌تواند منفی باشد"],
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    visibility: {
      type: String,
      enum: ["public", "private"],
      default: "public",
    },
    readTime: {
      type: String,
      default: 0,
    },
    source: {
      name: {
        type: String,
        required: [true, "نام منبع خبر الزامی است"],
        trim: true,
        maxLength: [200, "نام منبع نمی‌تواند بیشتر از ۲۰۰ کاراکتر باشد"],
      },
      link: {
        type: String,
        trim: true,
        validate: {
          validator: function (v) {
            return /^(https?:\/\/[^\s$.?#].[^\s]*)$/.test(v);
          },
          message: "لینک منبع معتبر نیست",
        },
      },
    },    
    publishDate: {
      type: Date,
    },
    publishStatus: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    socialLinks: [
      {
        link: {
          type: String,
          required: [true, "آدرس شبکه اجتماعی الزامی است"]
        },
        network: {
          type: ObjectId,
          ref: "SocialLink",
          required: [true, "نوع شبکه اجتماعی الزامی است"]
        }
      }
    ],
    ...baseSchema.obj,
  },
  { timestamps: true }
);

const defaultDomain = process.env.NEXT_PUBLIC_CLIENT_URL;

newsSchema.pre("save", async function (next) {
  try {
    // تنظیم newsId
    const counter = await Counter.findOneAndUpdate(
      { name: "newsId" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    this.newsId = counter.seq;

    // تنظیم canonicalUrl
    if (!this.canonicalUrl) {
      const slugPart = this.slug ? this.slug : encodeURIComponent(this.title);
      this.canonicalUrl = `${defaultDomain}/news/${slugPart}`;
    }

    // تنظیم metaTitle و metaDescription
    if (
      this.isModified("title") ||
      this.isModified("category") ||
      !this.metaTitle ||
      !this.metaDescription
    ) {
      const category = await Category.findById(this.category);
      const categoryTitle = category ? category.title : "عمومی";
      const summaryText = this.summary || "";

      let metaTitle = `${this.title} | ${categoryTitle}`;
      if (metaTitle.length > 60) metaTitle = metaTitle.substring(0, 57) + "...";
      this.metaTitle = metaTitle;

      let metaDescription = `${summaryText} | ${categoryTitle}`;
      if (metaDescription.length > 160) metaDescription = metaDescription.substring(0, 157) + "...";
      this.metaDescription = metaDescription;
    }

    next();
  } catch (err) {
    console.error("خطا در pre-save خبر:", err);
    next(err);
  }
});

const News = mongoose.model("News", newsSchema);
module.exports = News;
