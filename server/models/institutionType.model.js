const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const Counter = require("./counter");
const baseSchema = require("./baseSchema.model");

const institutionTypeSchema = new mongoose.Schema(
  {
    institutionTypeId: { type: Number, unique: true },
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

institutionTypeSchema.pre("save", async function (next) {
  try {
    if (!this.institutionTypeId) {
      const counter = await Counter.findOneAndUpdate(
        { name: "institutionTypeId" },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );
      this.institutionTypeId = counter.seq;
    }
    next();
  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.model("InstitutionType", institutionTypeSchema);
