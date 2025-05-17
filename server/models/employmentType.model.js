const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const Counter = require("./counter");
const baseSchema = require("./baseSchema.model");

const employmentTypeSchema = new mongoose.Schema(
  {
    employmentTypeId: { type: Number, unique: true },
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

employmentTypeSchema.pre("save", async function (next) {
  try {
    if (!this.employmentTypeId) {
      const counter = await Counter.findOneAndUpdate(
        { name: "employmentTypeId" },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );
      this.employmentTypeId = counter.seq;
    }
    next();
  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.model("EmploymentType", employmentTypeSchema);
