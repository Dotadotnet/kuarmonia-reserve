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
    type: {
      type: String,
      enum: ["job", "study", "immigration"],
      required: true
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
    capacity: { type: number },
    vacancy: { type: number },

    citizenshipStatus: {
      type: ObjectId,
      ref: "CitizenshipOutcome"
    },
    duration: { type: number },
       gender: {
      type: String,
      enum: ["Male", "Female", "Any"],
      required: true
    },
    isFeatured: { type: Boolean, default: false },
    status: {
      type: String,
      enum: ["active", "expired", "pendingApproval"],
      default: "pendingApproval"
    },

    job: { type: ObjectId, ref: "JobOpportunity" },
    study: { type: ObjectId, ref: "StudyOpportunity" },
    immigration: {
      type: ObjectId,
      ref: "ImmigrationOpportunity"
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
