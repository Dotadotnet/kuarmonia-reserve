const mongoose = require("mongoose");
const Counter = require("./counter");
const { ObjectId } = mongoose.Schema.Types;
const baseSchema = require("./baseSchema.model");

const studyOpportunitySchema = new mongoose.Schema({
  studyOpportunityId: {
    type: Number,
    unique: true
  },
  institution: [{ type: ObjectId, ref: "Institution", required: true }],
  fee: { type: number },
  scholarshipAvailable: { type: Boolean, default: false },
  ...baseSchema
});
studyOpportunitySchema.pre("save", async function (next) {
  try {
    if (!this.studyOpportunityId) {
      const counter = await Counter.findOneAndUpdate(
        { name: "studyOpportunityId" },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );
      this.studyOpportunityId = counter.seq;
    }

    next();
  } catch (err) {
    console.error("خطا در pre-save فرصت:", err);
    next(err);
  }
});
module.exports = mongoose.model("StudyOpportunity", studyOpportunitySchema);
