// models/Opportunity.js
const mongoose = require("mongoose");
const Counter = require("./counter");
const { ObjectId } = mongoose.Schema.Types;
const { encodeBase62 } = require("../utils/translationUtils");
const baseSchema = require("./baseSchema.model");

const opportunitySchema = new mongoose.Schema(
  {
    opportunityId: {
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
    refModel: {
      type: String,
      enum: ["JobOpportunity"],
      required: true
    },
    refId: {
      type: ObjectId,
      required: true,
      refPath: "refModel"
    },
    thumbnail: {
      url: {
        type: String,
        required: [true, "لطفاً  تصویر بندانگشتی را وارد کنید"],
        default: "./placeholder.png"
      },
      public_id: {
        type: String,
        default: "N/A"
      }
    },

    gallery: {
      type: [
        {
          url: {
            type: String,
            default: "https://placehold.co/296x200.png"
          },
          public_id: {
            type: String,
            default: "N/A"
          }
        }
      ]
    },
    capacity: { type: Number },
    vacancy: { type: Number },
    category: {
      type: ObjectId,
      ref: "Category",
      required: [true, "دسته‌بندی پست الزامی است"]
    },

    duration: { type: Number },
    gender: {
      type: String,
      enum: ["Male", "Female", "Any"],
      default: "Male"
    },
    isFeatured: { type: Boolean, default: false },
    status: {
      type: String,
      enum: ["active", "expired", "pendingApproval"],
      default: "pendingApproval"
    },

    shortUrl: {
      type: String,
      unique: true
    },

    tags: [
      {
        type: ObjectId,
        ref: "Tag",
        required: [true, "تگ ملک الزامی است"]
      }
    ],
    bookmarkedBy: [
      {
        type: ObjectId,
        ref: "User"
      }
    ],
    likes: [
      {
        type: ObjectId,
        ref: "like"
      }
    ],
    dislikes: [
      {
        type: ObjectId,
        ref: "like"
      }
    ],
    reviews: [
      {
        type: ObjectId,
        ref: "Review"
      }
    ],
    citizenshipOutcome: {
      type: ObjectId,
      ref: "CitizenshipOutcome",
      required: true
    },

    startDate: {
      type: Date,
      required: true,
      default: () => new Date()
    },
    endDate: {
      type: Date,
      required: true,
      default: () => {
        const date = new Date();
        date.setMonth(date.getMonth() + 1);
        return date;
      }
    },
    country: { type: ObjectId, ref: "Country" },
    city: { type: ObjectId, ref: "City" },

    views: {
      type: Number,
      default: 0,
      min: [0, "تعداد بازدید نمی‌تواند منفی باشد"]
    },
    creator: {
      type: ObjectId,
      ref: "Admin"
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
opportunitySchema.pre("save", async function (next) {
  try {
    if (!this.opportunityId) {
      const counter = await Counter.findOneAndUpdate(
        { name: "opportunityId" },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );
      this.opportunityId = counter.seq;

      const base62Code = encodeBase62(this.opportunityId);
      this.shortUrl = `${defaultDomain}/n/${base62Code}`;
    }

    next();
  } catch (err) {
    console.error("خطا در pre-save فرصت:", err);
    next(err);
  }
});
module.exports = mongoose.model("Opportunity", opportunitySchema);
