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
        required: [true, 'لطفاً حداقل یک تگ وارد کنید'], 
      },
    ],
    categories: [
      {
        type: ObjectId,
        ref: "Category",
        required: [true, 'لطفاً حداقل یک دسته‌بندی وارد کنید'], 
      },
    ],
    
    
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
    shortUrl: {
      type: String,
      unique: true,
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
const BASE62_ALPHABET = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

function encodeBase62(num) {
  if (num === 0) return BASE62_ALPHABET[0];
  
  let encoded = '';
  while (num > 0) {
    encoded = BASE62_ALPHABET[num % 62] + encoded;
    num = Math.floor(num / 62);
  }
  return encoded;
}
newsSchema.pre("save", async function (next) {
  try {
    // تنظیم newsId
    const counter = await Counter.findOneAndUpdate(
      { name: "newsId" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    this.newsId = counter.seq;

    // تولید shortUrl بر اساس newsId
    const base62Code = encodeBase62(this.newsId);
    // فرض کنید آدرس اصلی سایت در defaultDomain تعریف شده باشد:
    this.shortUrl = `${defaultDomain}/s/${base62Code}`;

    // تنظیم canonicalUrl
    if (!this.canonicalUrl) {
      const slugPart = this.slug ? this.slug : encodeURIComponent(this.title);
      this.canonicalUrl = `${defaultDomain}/news/${slugPart.replaceAll(" ","-")}`;
    }

    // تنظیم metaTitle و metaDescription (همانطور که قبلاً انجام می‌دهید)
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
