const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const Counter = require("./counter");
const baseSchema = require("./baseSchema.model");

const residencyStatusSchema = new mongoose.Schema({
  residencyStatusId: { type: Number, unique: true },
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

residencyStatusSchema.pre("save", async function (next) {
  try {
    if (!this.residencyStatusId) {
      const counter = await Counter.findOneAndUpdate(
        { name: "residencyStatusId" },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );
      this.residencyStatusId = counter.seq;
    }
    next();
  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.model("ResidencyStatus", residencyStatusSchema);
