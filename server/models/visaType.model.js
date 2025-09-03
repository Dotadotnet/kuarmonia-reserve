const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const baseSchema = require("./baseSchema.model");
const Counter = require("./counter");
const Seo = require("./seo.model");
const { encodeBase62 } = require("../utils/translationUtils");
const {
  generateSlug,
  translateToEnglish,
  generateSeoFields
} = require("../utils/seoUtils");

const visaTypeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    title_en: { type: String },

    slug_fa: { type: String, unique: true, index: true },
    slug_en: { type: String, unique: true, index: true },

    category: { type: ObjectId, ref: "Category", required: true },
    tags: [{ type: ObjectId, ref: "Tag" }],

    thumbnail: {
      url: { type: String, default: "./placeholder.png" },
      public_id: { type: String, default: "N/A" }
    },

    translations: [
      { translation: { type: ObjectId, ref: "Translation" }, language: String }
    ],

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
    if (!this.title_en && this.title) {
      this.title_en = await translateToEnglish(this.title);
    }

    if (!this.slug_en && this.title_en) {
      this.slug_en = await generateSlug(this.title_en);
    }

    if (!this.slug_fa && this.title) {
      this.slug_fa = await generateSlug(this.title);
    }

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


    next();
  } catch (err) {
    console.error("خطا در pre-save ویزا تایپ:", err);
    next(err);
  }
});

module.exports = mongoose.model("VisaType", visaTypeSchema);
