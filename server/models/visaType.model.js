const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const baseSchema = require("./baseSchema.model");
const Counter = require("./counter");
const { encodeBase62 } = require("../utils/translationUtils");

const visaTypeSchema = new mongoose.Schema(
  {
    title: {
      fa: { type: String, required: [true, "عنوان فارسی الزامی است"], minlength: [3], maxlength: [100] },
      en: { type: String, default: "" },
      tr: { type: String, default: "" }
    },
    
    // Summary with multilingual support
    summary: {
      fa: { type: String, required: [true, "خلاصه فارسی الزامی است"], minlength: [10], maxlength: [500] },
      en: { type: String, default: "" },
      tr: { type: String, default: "" }
    },
    
    // Content with multilingual support
    content: {
      fa: { type: String, default: "" },
      en: { type: String, default: "" },
      tr: { type: String, default: "" }
    },

    // Roadmap with multilingual support
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
     
        }
      ],
      required: [true, "مسیر (Roadmap) الزامی است"]
    },

    // FAQs with multilingual support
    faqs: {
      type: [
        {
          question: {
            fa: { type: String, required: [true, "سوال الزامی است"] },
            en: { type: String, default: "" },
            tr: { type: String, default: "" }
          },
          answer: {
            fa: { type: String, required: [true, "پاسخ الزامی است"] },
            en: { type: String, default: "" },
            tr: { type: String, default: "" }
          }
        }
      ],
      required: [true, "سوالات متداول الزامی است"]
    },

    // Costs with multilingual support
    costs: {
      type: [
        {
          country: {
            fa: { type: String, required: [true, "کشور الزامی است"] },
            en: { type: String, default: "" },
            tr: { type: String, default: "" }
          },
          fee: {
            fa: { type: String, required: [true, "مبلغ هزینه الزامی است"] },
            en: { type: String, default: "" },
            tr: { type: String, default: "" }
          }
        }
      ]
    },

    // Durations with multilingual support
    durations: {
      type: [
        {
          country: {
            fa: { type: String, required: [true, "کشور الزامی است"] },
            en: { type: String, default: "" },
            tr: { type: String, default: "" }
          },
          validity: {
            fa: { type: String, required: [true, "اعتبار الزامی است"] },
            en: { type: String, default: "" },
            tr: { type: String, default: "" }
          }
        }
      ]
    },

    // Conditions with multilingual support (array of strings)
    conditions: {
      type: [
        {
          fa: { type: String, required: [true, "شرایط الزامی است"] },
          en: { type: String, default: "" },
          tr: { type: String, default: "" }
        }
      ]
    },

    // Advantages with multilingual support (array of strings)
    advantages: {
      type: [
        {
          fa: { type: String, required: [true, "مزایا الزامی است"] },
          en: { type: String, default: "" },
          tr: { type: String, default: "" }
        }
      ]
    },

    // Disadvantages with multilingual support (array of strings)
    disadvantages: {
      type: [
        {
          fa: { type: String, required: [true, "معایب الزامی است"] },
          en: { type: String, default: "" },
          tr: { type: String, default: "" }
        }
      ]
    },

    slug: {
      fa: { type: String, unique: true, index: true },
      en: { type: String, unique: true, index: true },
      tr: { type: String, unique: true, index: true }
    },

    // Canonical URL with multilingual support
    canonicalUrl: {
      fa: { type: String },
      en: { type: String },
      tr: { type: String }
    },

    category: { type: ObjectId, ref: "Category", required: true },
    tags: [{ type: ObjectId, ref: "Tag" }],

    thumbnail: {
      url: { type: String, required: [true, "تصویر بندانگشتی الزامی است"] },
      public_id: { type: String, default: "N/A" }
    },

    icon: { type: String },
    creator: { type: ObjectId, ref: "Admin", required: true },

    visaTypeId: { type: Number },
    shortUrl: { type: String, unique: true },

    ...baseSchema.obj
  },
  { timestamps: true }
);

const defaultDomain = process.env.NEXT_PUBLIC_CLIENT_URL;

visaTypeSchema.pre("save", async function (next) {
  try {
    if (!this.visaTypeId) {
      const counter = await Counter.findOneAndUpdate(
        { name: "visaTypeId" },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );
      this.visaTypeId = counter.seq;
      const base62Code = encodeBase62(this.visaTypeId);
      this.shortUrl = `${defaultDomain}/vt/${base62Code}`;
    }

    // Generate canonical URLs if slugs exist and canonicalUrl is not already set
    if (this.slug && (!this.canonicalUrl || !this.canonicalUrl.fa)) {
      this.canonicalUrl = {
        fa: `${defaultDomain}/visa-type/${this.slug.fa}/${this.visaTypeId}`,
        en: `${defaultDomain}/en/visa-type/${this.slug.en}/${this.visaTypeId}`,
        tr: `${defaultDomain}/tr/visa-type/${this.slug.tr}/${this.visaTypeId}`
      };
    }

    next();
  } catch (err) {
    console.error("خطا در pre-save ویزا تایپ:", err);
    next(err);
  }
});

module.exports = mongoose.model("VisaType", visaTypeSchema);