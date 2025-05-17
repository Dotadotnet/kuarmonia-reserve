const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const Counter = require("./counter");
const baseSchema = require("./baseSchema.model");

const jobTypeSchema = new mongoose.Schema(
  {
    jobTypeId: {
      type: Number,
      unique: true
    },
    icon: {
      type: String,
      required: false
    },
    thumbnail: {
      url: {
        type: String,
        default: "https://placehold.co/300x300.png"
      },
      public_id: {
        type: String,
        default: "N/A"
      }
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

    creator: {
      type: ObjectId,
      ref: "Admin"
    },
    ...baseSchema.obj
  },
  { timestamps: true }
);
jobTypeSchema.pre("save", async function (next) {
  try {
    if (!this.jobTypeId) {
      const counter = await Counter.findOneAndUpdate(
        { name: "jobTypeId" },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );
      this.jobTypeId = counter.seq;
    }

    next();
  } catch (err) {
    console.error("خطا در pre-save نوع شغل:", err);
    next(err);
  }
});
module.exports = mongoose.model("JobType", jobTypeSchema);
