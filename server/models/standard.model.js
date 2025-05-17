/* External Imports */
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const baseSchema = require("./baseSchema.model");
const Counter = require("./counter");

const standardSchema = new mongoose.Schema(
  {
    standardId: {
      type: Number,
      unique: true
    },
    translations: [
      {
        translation: {
          type: mongoose.Schema.Types.ObjectId,
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
      enum: ["building", "hotel", "university", "venue", "other"],
      required: [true, "نوع استاندارد را مشخص کنید"]
    },

    year: {
      type: Number,
      required: [true, "سال الزامی است"],
      min: [1900, "سال باید بعد از ۱۹۰۰ باشد"],
      max: [new Date().getFullYear(), `سال نمی‌تواند در آینده باشد`]
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
    isInternational: {
      type: Boolean,
      default: false
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

    ...baseSchema.obj
  },
  { timestamps: true }
);

standardSchema.pre("save", async function (next) {
  try {
    const counter = await Counter.findOneAndUpdate(
      { name: "standardId" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    this.standardId = counter.seq;
    next();
  } catch (error) {
    next(error);
  }
});

const propStandard = mongoose.model("Standard", standardSchema);

module.exports = propStandard;
