const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const seoSchema = new mongoose.Schema({
  metaTitle: { type: String, trim: true },
  metaDescription: { type: String, trim: true },
  metaKeywords: [{ type: String, trim: true }],

  ogTitle: { type: String, trim: true },
  ogDescription: { type: String, trim: true },
  ogImage: { type: String, trim: true },

  twitterTitle: { type: String, trim: true },
  twitterDescription: { type: String, trim: true },
  twitterImage: { type: String, trim: true },

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

  structuredData: { type: mongoose.Schema.Types.Mixed },

  ownerModel: { type: String, required: true },
  ownerId: { type: ObjectId, required: true }
}, { timestamps: true });

seoSchema.index({ ownerModel: 1, ownerId: 1 }, { unique: true });

module.exports = mongoose.model("Seo", seoSchema);
