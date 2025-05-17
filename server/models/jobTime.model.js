const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const Counter = require("./counter");
const baseSchema = require("./baseSchema.model");

const jobTimeSchema = new mongoose.Schema(
  {
    jobTimeId: { type: Number, unique: true },
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

jobTimeSchema.pre("save", async function (next) {
  try {
    if (!this.jobTimeId) {
      const counter = await Counter.findOneAndUpdate(
        { name: "jobTimeId" },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );
      this.jobTimeId = counter.seq;
    }
    next();
  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.model("JobTime", jobTimeSchema);
