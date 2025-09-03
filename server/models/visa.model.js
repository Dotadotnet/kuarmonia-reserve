const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const Counter = require("./counter");
const baseSchema = require("./baseSchema.model");
const Seo = require("./seo.model");
const { encodeBase62 } = require("../utils/translationUtils");
const {
  generateSlug,
  translateToEnglish,
  generateSeoFields
} = require("../utils/seoUtils");
const VisaType = require("./visaType.model");

const visaSchema = new mongoose.Schema(
  {
    visaId: { type: Number, unique: true },
    title: { type: String, required: true, unique: true },
    title_en: { type: String },

    slug_fa: { type: String, unique: true, index: true },
    slug_en: { type: String, unique: true, index: true },

    translations: [
      {
        translation: { type: ObjectId, ref: "Translation", required: true },
        language: { type: String, enum: ["fa", "en", "tr"], required: true }
      }
    ],
    thumbnail: {
      url: { type: String, default: "./placeholder.png" },
      public_id: { type: String, default: "N/A" }
    },

    tags: [{ type: ObjectId, ref: "Tag" }],
    type: { type: ObjectId, ref: "VisaType" },

    views: { type: Number, default: 0, min: 0 },
    likes: { type: Number, default: 0, min: 0 },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    reviews: [{ type: ObjectId, ref: "Review" }],
    shortUrl: { type: String, unique: true },
    creator: { type: ObjectId, ref: "Admin", required: true },

    ...baseSchema.obj
  },
  { timestamps: true }
);

const defaultDomain = process.env.NEXT_PUBLIC_CLIENT_URL;

visaSchema.pre("save", async function (next) {
  try {
    if (!this.visaId) {
      const counter = await Counter.findOneAndUpdate(
        { name: "visaId" },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );
      this.visaId = counter.seq;
      const base62Code = encodeBase62(this.visaId);
      this.shortUrl = `${defaultDomain}/v/${base62Code}`;
    }

    if (!this.title_en && this.title) {
      this.title_en = await translateToEnglish(this.title);
    }

    if (!this.slug_en && this.title_en) {
      this.slug_en = await generateSlug(this.title_en);
    }

    if (!this.slug_fa && this.title) {
      this.slug_fa = await generateSlug(this.title);
    }

    next();
  } catch (err) {
    console.error("خطا در pre-save ویزا:", err);
    next(err);
  }
});

module.exports = mongoose.model("Visa", visaSchema);
