const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const Counter = require("./counter");
const baseSchema = require("./baseSchema.model");

const jobModeSchema = new mongoose.Schema(
  {
    jobModeId: { type: Number, unique: true },
    translations: [
      {
        translation: { type: ObjectId, ref: "Translation", required: true },
        language: { type: String, enum: ["fa", "en", "tr"], required: true }
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

jobModeSchema.pre("save", async function (next) {
  try {
    if (!this.jobModeId) {
      const counter = await Counter.findOneAndUpdate(
        { name: "jobModeId" },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );
      this.jobModeId = counter.seq;
    }
    next();
  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.model("JobMode", jobModeSchema);
