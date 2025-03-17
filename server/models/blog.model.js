const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const Tag = require("./tag.model");
const Category = require("./category.model");
const Counter = require("./counter")
const baseSchema = require("./baseSchema.model");


const blogSchema =  new mongoose.Schema(
  {
    blogId: {
      type: Number,
      unique: true,
    },
    title: {
      type: String,
      required: [true, "عنوان پست الزامی است"],
      trim: true,
      minLength: [3, "عنوان پست باید حداقل ۳ کاراکتر باشد"],
      maxLength: [100, "عنوان پست نمی‌تواند بیشتر از ۱۰۰ کاراکتر باشد"],
    },
    slug: {
      type: String,
      unique: true,
      required: false,
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
    description: {
      type: String,
      maxLength: [300, "توضیحات نمی‌تواند بیشتر از ۳۰۰ کاراکتر باشد"],
      required: [true, "توضیحات الزامی است"],
    },
    thumbnail: {
      url: {
        type: String,
        required: [true, "لطفاً لینک تصویر بندانگشتی را وارد کنید"],
        default: "https://placehold.co/296x200.png",
      },
      public_id: {
        type: String,
        default: "N/A",
      },
    },
    content: {
      type: String,
      required: [true, "محتوا الزامی است"],
    },
    metaTitle: {
      type: String,
      maxLength: [60, "متا تایتل نمی‌تواند بیشتر از ۶۰ کاراکتر باشد"],
      default: "",
    },
    metaDescription: {
      type: String,
      maxLength: [160, "متا توضیحات نمی‌تواند بیشتر از ۱۶۰ کاراکتر باشد"],
      default: "",
    },

    canonicalUrl: {
      type: String,
      required: false,
      trim: true,
      validate: {
        validator: function(v) {
          return /^(https?:\/\/[^\s$.?#].[^\s]*)$/.test(v);
        },
        message: "URL معتبر نیست",
      },
    },
    readTime: {
      type: String,
      default: 0,
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
    relatedBlogs: [
      {
        type: ObjectId,
        ref: "Blog",
      },
    ],

    relatedEvents: [
      {
        type: ObjectId,
        ref: "Event",
      },
    ],
 
    lastUpdated: {
      type: Date,
      default: Date.now,
    },
    publishDate: {
      type: Date,
    },
    publishStatus: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
      required: [true, "وضعیت انتشار الزامی است"],
    },
    tags: [
      {
        type: ObjectId,
        ref: "Tag",
        required: [true, "تگ پست الزامی است"],
      },
    ],
    category: {
      type: ObjectId,
      ref: "Category",
      required: [true, "دسته‌بندی پست الزامی است"],
    },
    creator: {
      type: ObjectId,
      ref: "Admin",
      required: [true, "شناسه نویسنده الزامی است"],
    },

    views: {
      type: Number,
      default: 0,
      min: [0, "تعداد بازدید نمی‌تواند منفی باشد"],
    },
    socialLinks: [
      {
        name: { type: String, required: true },
        url: { type: String, required: true },
      }
    ],
    ...baseSchema.obj,
  },
  { timestamps: true }
);



const defaultDomain = process.env.NEXT_PUBLIC_CLIENT_URL;


blogSchema.pre("save", async function (next) {
  try {
    // تنظیم blogId با استفاده از Counter
    const counter = await Counter.findOneAndUpdate(
      { name: "blogId" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    this.blogId = counter.seq;

    // تنظیم canonicalUrl در صورت نبود مقدار
    if (!this.canonicalUrl) {
      const slugPart = this.slug ? this.slug : encodeURIComponent(this.title);
      this.canonicalUrl = `${defaultDomain}/blog/${slugPart}`;
    }

    // بررسی تغییرات و تنظیم metaTitle و metaDescription
    if (
      this.isModified("title") ||
      this.isModified("category") ||
      !this.metaTitle ||
      !this.metaDescription
    ) {
      const category = await Category.findById(this.category);
      const categoryTitle = category ? category.title : "عمومی";
      const descriptionText = this.description ? this.description : "";

      // **تولید metaTitle**
      let combinedMetaTitle = `${this.title} | ${categoryTitle}`;
      if (combinedMetaTitle.length > 60) {
        combinedMetaTitle = combinedMetaTitle.substring(0, 57) + "...";
      }
      this.metaTitle = combinedMetaTitle;

      // **تولید metaDescription**
      let combinedMetaDescription = `${descriptionText} | ${categoryTitle}`;
      if (combinedMetaDescription.length > 160) {
        combinedMetaDescription = combinedMetaDescription.substring(0, 157) + "...";
      }
      this.metaDescription = combinedMetaDescription;
    }

    next(); // ✅ `next()` فقط یک‌بار و در انتهای پردازش اجرا می‌شود.
  } catch (error) {
    console.error("خطا در تنظیم metaTitle، metaDescription و canonicalUrl:", error);
    next(error); // اگر خطایی رخ دهد، `next(error)` را فراخوانی می‌کنیم تا مانع ذخیره‌سازی شود.
  }
});


const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;



