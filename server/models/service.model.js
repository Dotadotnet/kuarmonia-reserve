const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const Counter = require("./counter");
const baseSchema = require("./baseSchema.model");
const Category = require("./category.model");

const {
  generateSlug,
  generateSeoFields,
  encodeBase62
} = require("../utils/translationUtils");

const serviceSchema = new mongoose.Schema(
  {
    serviceId: {
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
          enum: ["en", "tr", "ar"],
          required: true
        }
      }
    ],
    title: {
      type: String,
      required: [true, "عنوان خدمت الزامی است"],
      trim: true
    },
    slug: {
      type: String,
      unique: true
    },
    summary: {
      type: String,
      maxLength: [300, "خلاصه خدمت نمی‌تواند بیشتر از ۳۰۰ کاراکتر باشد"],
      required: [true, "خلاصه خدمت الزامی است"]
    },
    content: {
      type: String,
      required: [true, "متن خدمت الزامی است"]
    },
    icon: {
      type: String,
      required: [true, " ایکون الزامی است"],
      description:
        "آیکون مربوط به نوع خدمت محل جشن، می‌تواند شامل یک کد یونیکد یا URL آیکون باشد"
    },
    thumbnail: {
      url: { type: String, required: true },
      public_id: { type: String, default: "N/A" }
    },
    roadmap: [
      {
        title: { type: String, required: true },
        description: { type: String, required: true },
        duration: { type: String, required: true },
        link: {
          text: { type: String, required: false },
          url: { type: String, required: false }
        }
      }
    ],
    faqs: [
      {
        question: { type: String, required: true },
        answer: { type: String, required: true }
      }
    ],
    metaTitle: {
      type: String,
      maxLength: [60, "متا تایتل نمی‌تواند بیشتر از ۶۰ کاراکتر باشد"]
    },
    metaDescription: {
      type: String,
      maxLength: [160, "متا توضیحات نمی‌تواند بیشتر از ۱۶۰ کاراکتر باشد"]
    },
    canonicalUrl: {
      type: String,
      trim: true,
      validate: {
        validator: function (v) {
          return /^(https?:\/\/[^\s$.?#].[^\s]*)$/.test(v);
        },
        message: "URL معتبر نیست"
      }
    },
    tags: [
      {
        type: ObjectId,
        ref: "Tag",
        required: [true, "لطفاً حداقل یک تگ وارد کنید"]
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
      required: true
    },
    views: {
      type: Number,
      default: 0,
      min: [0, "تعداد بازدید نمی‌تواند منفی باشد"]
    },
    shortUrl: {
      type: String,
      unique: true
    },

    ...baseSchema.obj
  },
  { timestamps: true }
);

const defaultDomain = process.env.NEXT_PUBLIC_CLIENT_URL;
serviceSchema.pre("save", async function (next) {
  try {
    if (this.isModified("title")) {
      this.slug = await generateSlug(this.title);
    }

    if (!this.metaTitle || !this.metaDescription) {
      const category = await Category.findById(this.category);
      const seo = generateSeoFields({
        title: this.title,
        summary: this.summary,
        categoryTitle: category?.title || "عمومی"
      });

      if (!this.metaTitle) this.metaTitle = seo.metaTitle;
      if (!this.metaDescription) this.metaDescription = seo.metaDescription;
    }

    if (!this.serviceId) {
      const counter = await Counter.findOneAndUpdate(
        { name: "serviceId" },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );
      this.serviceId = counter.seq;

      const base62Code = encodeBase62(this.serviceId);
      this.shortUrl = `${defaultDomain}/s/${base62Code}`;
    }

    if (!this.canonicalUrl) {
      this.canonicalUrl = `${defaultDomain}/service/${this.slug}`;
    }

    next();
  } catch (err) {
    console.error("خطا در pre-save خدمت:", err);
    next(err);
  }
});

const Service = mongoose.model("Service", serviceSchema);
module.exports = Service;
