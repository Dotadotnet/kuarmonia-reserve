const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const Counter = require("./counter");
const baseSchema = require("./baseSchema.model");

const experienceLevelSchema = new mongoose.Schema({
  experienceLevelId: { type: Number, unique: true },
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
  { timestamps: true });

experienceLevelSchema.pre("save", async function (next) {
  try {
    if (!this.experienceLevelId) {
      const counter = await Counter.findOneAndUpdate(
        { name: "experienceLevelId" },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );
      this.experienceLevelId = counter.seq;
    }
    next();
  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.model("ExperienceLevel", experienceLevelSchema);
