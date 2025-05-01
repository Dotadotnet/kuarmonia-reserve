const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const Counter = require("./counter");
const baseSchema = require("./baseSchema.model");
const {
  encodeBase62
} = require("../utils/translationUtils");

const newsSchema = new mongoose.Schema(
  {
    newsId: {
      type: Number,
      unique: true
    },
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
    thumbnail: {
      url: { type: String, required: true },
      public_id: { type: String, default: "N/A" }
    },

    tags: [
      {
        type: ObjectId,
        ref: "Tag",
        required: [true, "لطفاً حداقل یک تگ وارد کنید"]
      }
    ],
    type: {
      type: ObjectId,
      ref: "NewsType",
      required: [true, " نوع خبر (مثلاً علمی یا اقتصادی) الزامی است"]
    },
    country: {
      type: ObjectId,
      ref: "NewsCountry"
    },
    relatedNews: [
      {
        type: ObjectId,
        ref: "News"
      }
    ],
    categories: [
      {
        type: ObjectId,
        ref: "Category",
        required: [true, "لطفاً حداقل یک دسته‌بندی وارد کنید"]
      }
    ],

    creator: {
      type: ObjectId,
      ref: "Admin",
      required: true
    },
    views: {
      type: Number,
      default: 0,
      min: [0, "تعداد بازدید نمی‌تواند منفی باشد"]
    },
    isFeatured: {
      type: Boolean,
      default: false
    },
    shortUrl: {
      type: String,
      unique: true
    },
    visibility: {
      type: String,
      enum: ["public", "private"],
      default: "public"
    },
    readTime: {
      type: String,
      default: 0
    },
    source: {
      name: {
        type: String,
        trim: true,
        maxLength: [200, "نام منبع نمی‌تواند بیشتر از ۲۰۰ کاراکتر باشد"],
        required: false
      },
      link: {
        type: String,
        required: false,
        validate: {
          validator: function (v) {
            if (!v) return true;
            return /^(https?:\/\/[^\s$.?#].[^\s]*)$/.test(v);
          },
          message: "لینک منبع معتبر نیست"
        }
      }
    },
    publishDate: {
      type: Date
    },
    publishStatus: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending"
    },
    socialLinks: [
      {
        link: {
          type: String
        },
        network: {
          type: ObjectId,
          ref: "SocialLink"
        }
      }
    ],
    ...baseSchema.obj
  },
  { timestamps: true }
);

const defaultDomain = process.env.NEXT_PUBLIC_CLIENT_URL;
newsSchema.pre("save", async function (next) {
  try {
   
    if (!this.newsId) {
      const counter = await Counter.findOneAndUpdate(
        { name: "newsId" },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );
      this.newsId = counter.seq;

      const base62Code = encodeBase62(this.newsId);
      this.shortUrl = `${defaultDomain}/n/${base62Code}`;
    }

   
    next();
  } catch (err) {
    console.error("خطا در pre-save خبر:", err);
    next(err);
  }
});

const News = mongoose.model("News", newsSchema);
module.exports = News;
