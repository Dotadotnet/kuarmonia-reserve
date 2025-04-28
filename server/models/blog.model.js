const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const Category = require("./category.model");
const Counter = require("./counter");
const baseSchema = require("./baseSchema.model");

const {
  generateSlug,
  generateSeoFields,
  encodeBase62
} = require("../utils/translationUtils");

const blogSchema = new mongoose.Schema(
  {
    blogId: {
      type: Number,
      unique: true
    },
    title: {
      type: String,
      required: [true, "عنوان پست الزامی است"],
      trim: true,
      minLength: [3, "عنوان پست باید حداقل ۳ کاراکتر باشد"],
      maxLength: [100, "عنوان پست نمی‌تواند بیشتر از ۱۰۰ کاراکتر باشد"]
    },
    slug: {
      type: String,
      unique: true
    },
    translations: [
      {
        type: ObjectId,
        ref: "Translation"
      }
    ],
    description: {
      type: String,
      maxLength: [300, "توضیحات نمی‌تواند بیشتر از ۳۰۰ کاراکتر باشد"],
      required: [true, "توضیحات الزامی است"]
    },
    thumbnail: {
      url: {
        type: String,
        required: [true, "لطفاً لینک تصویر بندانگشتی را وارد کنید"],
        default: "https://placehold.co/296x200.png"
      },
      public_id: {
        type: String,
        default: "N/A"
      }
    },
    content: {
      type: String,
      required: [true, "محتوا الزامی است"]
    },
    metaTitle: {
      type: String,
      maxLength: [60, "متا تایتل نمی‌تواند بیشتر از ۶۰ کاراکتر باشد"],
      default: ""
    },
    metaDescription: {
      type: String,
      maxLength: [160, "متا توضیحات نمی‌تواند بیشتر از ۱۶۰ کاراکتر باشد"],
      default: ""
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
    readTime: {
      type: String,
      default: 0
    },
    isFeatured: {
      type: Boolean,
      default: false
    },
    visibility: {
      type: String,
      enum: ["public", "private"],
      default: "public"
    },
    relatedBlogs: [
      {
        type: ObjectId,
        ref: "Blog"
      }
    ],

    relatedEvents: [
      {
        type: ObjectId,
        ref: "Event"
      }
    ],

    lastUpdated: {
      type: Date,
      default: Date.now
    },
    publishDate: {
      type: Date
    },
    publishStatus: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
      required: [true, "وضعیت انتشار الزامی است"]
    },
    tags: [
      {
        type: ObjectId,
        ref: "Tag",
        required: [true, "تگ پست الزامی است"]
      }
    ],
    category: {
      type: ObjectId,
      ref: "Category",
      required: [true, "دسته‌بندی پست الزامی است"]
    },
    creator: {
      type: ObjectId,
      ref: "Admin",
      required: [true, "شناسه نویسنده الزامی است"]
    },

    views: {
      type: Number,
      default: 0,
      min: [0, "تعداد بازدید نمی‌تواند منفی باشد"]
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

blogSchema.pre("save", async function (next) {
  try {
    const counter = await Counter.findOneAndUpdate(
      { name: "blogId" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    this.blogId = counter.seq;
    if (!this.metaTitle || !this.metaDescription) {
      const category = await NewsType.findById(this.type);
      const seo = generateSeoFields({
        title: this.title,
        summary: this.summary,
        categoryTitle: category?.title || "عمومی"
      });

      if (!this.metaTitle) this.metaTitle = seo.metaTitle;
      if (!this.metaDescription) this.metaDescription = seo.metaDescription;
    }
    const base62Code = encodeBase62(this.newsId);
    this.shortUrl = `${defaultDomain}/s/${base62Code}`;
    if (!this.canonicalUrl) {
      this.canonicalUrl = `${defaultDomain}/news/${this.slug}`;
    }

    next();
  } catch (error) {
    console.error(
      "خطا در تنظیم metaTitle، metaDescription و canonicalUrl:",
      error
    );
    next(error);
  }
});

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
