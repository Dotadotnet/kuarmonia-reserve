const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const Counter = require("./counter");
const baseSchema = require("./baseSchema.model");

const defaultDomain = process.env.NEXT_PUBLIC_CLIENT_URL;

const visaSchema = new mongoose.Schema(
  {
    visaId: { type: Number, unique: true },

    title: {
      fa: { type: String, required: [true, "عنوان الزامی است"], minlength: 3, maxlength: 100 },
      en: { type: String, default: "" },
      tr: { type: String, default: "" }
    },

    summary: {
      fa: { type: String, required: [true, "خلاصه الزامی است"], minlength: 10, maxlength: 500 },
      en: { type: String, default: "" },
      tr: { type: String, default: "" }
    },

    content: {
      fa: { type: String, default: "" },
      en: { type: String, default: "" },
      tr: { type: String, default: "" }
    },

    processingTime: {
      fa: { type: String, required: [true, "زمان پردازش الزامی است"] },
      en: { type: String, default: "" },
      tr: { type: String, default: "" }
    },

    validity: {
      fa: { type: String, required: [true, "اعتبار الزامی است"] },
      en: { type: String, default: "" },
      tr: { type: String, default: "" }
    },

    difficultyLevel: {
      fa: { type: String, required: [true, "سطح دشواری الزامی است"] },
      en: { type: String, default: "" },
      tr: { type: String, default: "" }
    },

    roadmap: {
      type: [
        {
          title: { fa: { type: String, required: true }, en: { type: String, default: "" }, tr: { type: String, default: "" } },
          description: { fa: { type: String, required: true }, en: { type: String, default: "" }, tr: { type: String, default: "" } },
          duration: { fa: { type: String, required: true }, en: { type: String, default: "" }, tr: { type: String, default: "" } },
          link: { fa: { type: String, default: "" }, en: { type: String, default: "" }, tr: { type: String, default: "" } }
        }
      ],
      required: [true, "مسیر (Roadmap) الزامی است"]
    },

    faqs: {
      type: [
        {
          question: { fa: { type: String, required: true }, en: { type: String, default: "" }, tr: { type: String, default: "" } },
          answer: { fa: { type: String, required: true }, en: { type: String, default: "" }, tr: { type: String, default: "" } }
        }
      ],
      required: [true, "سوالات متداول الزامی است"]
    },

    costs: {
      type: [
        {
          title: { fa: { type: String, required: true }, en: { type: String, default: "" }, tr: { type: String, default: "" } },
          fee: { fa: { type: String, required: true }, en: { type: String, default: "" }, tr: { type: String, default: "" } }
        }
      ]
    },

    documents: {
      type: [
        {
          title: { fa: { type: String, required: true }, en: { type: String, default: "" }, tr: { type: String, default: "" } },
          description: { fa: { type: String, required: true }, en: { type: String, default: "" }, tr: { type: String, default: "" } },
          type: { type: String, enum: ["mandatory", "optional"] }
        }
      ]
    },

    conditions: { type: [{ fa: String, en: String, tr: String }] },
    advantages: { type: [{ fa: String, en: String, tr: String }] },
    disadvantages: { type: [{ fa: String, en: String, tr: String }] },
    rejectionReasons: { type: [{ fa: String, en: String, tr: String }] },
    successTips: { type: [{ fa: String, en: String, tr: String }] },

    slug: {
      fa: { type: String, unique: true, index: true },
      en: { type: String, unique: true, index: true },
      tr: { type: String, unique: true, index: true }
    },

    canonicalUrl: {
      fa: String,
      en: String,
      tr: String
    },
    creator: { type: ObjectId, ref: "Admin", required: true },

    thumbnail: { url: { type: String, required: true }, public_id: { type: String, required: true } },

    tags: [{ type: ObjectId, ref: "Tag" }],
    type: { type: ObjectId, ref: "VisaType", required: true },
    country: { type: ObjectId, ref: "Country", required: true },
    views: { type: Number, default: 0 },
    status: { type: String, enum: ["draft", "published", "archived"], default: "draft" },

    ...baseSchema.obj
  },
  { timestamps: true, versionKey: false }
);

// Auto-increment visaId and generate canonical URLs
visaSchema.pre("save", async function (next) {
  try {
    if (this.isNew) {
      // Auto-increment visaId
      const counter = await Counter.findOneAndUpdate(
        { name: "visaId" },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );
      this.visaId = counter.seq;

      // Generate canonical URLs based on slug
      if (this.slug) {
        const baseUrl = defaultDomain || "";
        this.canonicalUrl = {
          fa: `${baseUrl}/visa/${this.slug.fa}/${this.visaId}`,
          en: `${baseUrl}/en/visa/${this.slug.en}/${this.visaId}`,
          tr: `${baseUrl}/tr/visa/${this.slug.tr}/${this.visaId}`
        };
      }
    }

    next();
  } catch (err) {
    console.error("خطا در pre-save ویزا:", err);
    next(err);
  }
});

module.exports = mongoose.model("Visa", visaSchema);
