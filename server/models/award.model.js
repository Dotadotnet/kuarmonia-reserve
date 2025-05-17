/* External Imports */
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const baseSchema = require("./baseSchema.model");
const Counter = require("./counter");

const awardSchema = new mongoose.Schema(
  {
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
    year: {
      type: Number,
      required: [true, "سال الزامی است"],
      min: [1900, "سال باید بعد از ۱۹۰۰ باشد"],
      max: [new Date().getFullYear(), `سال نمی‌تواند در آینده باشد`]
    },
    type: {
      type: String,
      enum: ["building", "hotel", "university", "venue", "other"],
      required: [true, "نوع استاندارد را مشخص کنید"]
    },
    isInternational: {
      type: Boolean,
      default: false
    },
    thumbnail: {
      url: {
        type: String,
        default: "https://placehold.co/296x200.png"
      },
      public_id: {
        type: String,
        default: "N/A"
      }
    },
    referenceUrl: {
      type: String,
      required: false,
      match: [
        /^https?:\/\/.*$/,
        "آدرس لینک مطالعه بیشتر باید یک URL معتبر باشد"
      ]
    },
    creator: {
      type: ObjectId,
      ref: "Admin",
      required: [true, "شناسه مدیر الزامی است"]
    },
    awardId: {
      type: Number
    },
    ...baseSchema.obj
  },
  { timestamps: true }
);

awardSchema.pre("save", async function (next) {
  try {
    const counter = await Counter.findOneAndUpdate(
      { name: "awardId" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    this.awardId = counter.seq;
    next();
  } catch (error) {
    next(error);
  }
});

const Award = mongoose.model("Award", awardSchema);

module.exports = Award;
