const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const Counter = require("./counter");
const baseSchema = require("./baseSchema.model");

const citizenshipOutcomeSchema = new mongoose.Schema(
  {
    citizenshipOutcomeId: { type: Number, unique: true },

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

citizenshipOutcomeSchema.pre("save", async function (next) {
  try {
    if (!this.citizenshipOutcomeId) {
      const counter = await Counter.findOneAndUpdate(
        { name: "citizenshipOutcomeId" },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );
      this.citizenshipOutcomeId = counter.seq;
    }
    next();
  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.model("CitizenshipOutcome", citizenshipOutcomeSchema);
