const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const Counter = require("./counter");
const baseSchema = require("./baseSchema.model");

const { encodeBase62 } = require("../utils/translationUtils");

// Shared validation messages
const titleRequiredMessage = "عنوان فارسی الزامی است";
const titleMinLengthMessage = "عنوان فارسی باید حداقل ۳ کاراکتر باشد";
const titleMaxLengthMessage = "عنوان فارسی باید حداکثر ۱۰۰ کاراکتر باشد";

const summaryRequiredMessage = "خلاصه فارسی الزامی است";
const summaryMinLengthMessage = "خلاصه فارسی باید حداقل ۱۰ کاراکتر باشد";
const summaryMaxLengthMessage = "خلاصه فارسی باید حداکثر ۵۰۰ کاراکتر باشد";

const requiredArrayMessage = "این بخش الزامی است و نمی‌تواند خالی باشد";

const serviceSchema = new mongoose.Schema(
  {
    serviceId: { type: Number, unique: true },

    // === Title - فقط fa اجباری ===
    title: {
      fa: { type: String, required: [true, "عنوان فارسی الزامی است"], minlength: [3], maxlength: [100] },
      en: { type: String, default: "" },
      tr: { type: String, default: "" }
    },

    // === Summary - فقط fa اجباری ===
    summary: {
      fa: { type: String, required: [true, "خلاصه فارسی الزامی است"], minlength: [10], maxlength: [500] },
      en: { type: String, default: "" },
      tr: { type: String, default: "" }
    },

    // === Content - همه اختیاری ===
    content: {
      fa: { type: String, default: "" },
      en: { type: String, default: "" },
      tr: { type: String, default: "" }
    },

    // === Roadmap - فقط fa اجباری ===
    roadmap: {
      type: [
        {
          title: {
            fa: { type: String, required: true },
            en: { type: String, default: "" },
            tr: { type: String, default: "" }
          },
          description: {
            fa: { type: String, required: true },
            en: { type: String, default: "" },
            tr: { type: String, default: "" }
          },
          duration: {
            fa: { type: String, required: true },
            en: { type: String, default: "" },
            tr: { type: String, default: "" }
          },
          link: {
            fa: { type: String, default: "" },
            en: { type: String, default: "" },
            tr: { type: String, default: "" }
          }
        }
      ],
      required: [true, "مسیر (Roadmap) الزامی است"]
    },

    // === FAQs - فقط fa اجباری ===
    faqs: {
      type: [
        {
          question: {
            fa: { type: String, required: true },
            en: { type: String, default: "" },
            tr: { type: String, default: "" }
          },
          answer: {
            fa: { type: String, required: true },
            en: { type: String, default: "" },
            tr: { type: String, default: "" }
          }
        }
      ],
      required: [true, "سوالات متداول الزامی است"]
    },

    // === What You'll Read - فقط fa اجباری ===
    whatYouWillRead: {
      type: [
        {
          fa: { type: String, required: true },
          en: { type: String, default: "" },
          tr: { type: String, default: "" }
        }
      ],
      required: [true, "آنچه خواهید خواند الزامی است"]
    },

    // === Slug ===
    slug: { fa: String, en: String, tr: String },

    // === Canonical URL ===
    canonicalUrl: { fa: String, en: String, tr: String },

    // === Icon ===
    icon: { type: String, required: [true, "آیکون الزامی است"] },

    // === Thumbnail ===
    thumbnail: {
      url: { type: String, required: true },
      public_id: { type: String, default: "N/A" }
    },

    // === Tags ===
    tags: [
      {
        type: ObjectId,
        ref: "Tag",
        required: [true, "لطفاً حداقل یک تگ وارد کنید"]
      }
    ],

    // === Category ===
    category: {
      type: ObjectId,
      ref: "Category",
      required: [true, "دسته‌بندی پست الزامی است"]
    },

    // === Creator ===
    creator: { type: ObjectId, ref: "Admin", required: true },

    // === Views ===
    views: { type: Number, default: 0, min: [0, "تعداد بازدید نمی‌تواند منفی باشد"] },

    // === Short URL ===
    shortUrl: { type: String, unique: true },

    ...baseSchema.obj
  },
  { timestamps: true }
);

const defaultDomain = process.env.NEXT_PUBLIC_CLIENT_URL;
serviceSchema.pre("save", async function (next) {
  try {
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
    
    // Generate canonical URLs if slugs exist and canonicalUrl is not already set
    if (this.slug && (!this.canonicalUrl || !this.canonicalUrl.fa)) {
      this.canonicalUrl = {
        fa: `${defaultDomain}/services/${this.slug.fa}/${this.serviceId}`,
        en: `${defaultDomain}/en/services/${this.slug.en}/${this.serviceId}`,
        tr: `${defaultDomain}/tr/services/${this.slug.tr}/${this.serviceId}`
      };
    }
    
    next();
  } catch (err) {
    console.error("خطا در pre-save خدمت:", err);
    next(err);
  }
});

const Service = mongoose.model("Service", serviceSchema);
module.exports = Service;
