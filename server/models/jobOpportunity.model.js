const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema.Types;
const Counter = require("./counter");

const jobOpportunitySchema = new mongoose.Schema({
  jobOpportunityId: { type: Number, unique: true },
  owner: { type: ObjectId, ref: "owner", required: true },
  jobType: { type: ObjectId, ref: "JobType", required: true },
  jobTime: { type: ObjectId, ref: "JobTime", required: true },
  jobMode: { type: ObjectId, ref: "JobMode", required: true },
  employmentType: { type: ObjectId, ref: "EmploymentType", required: true },
  experienceLevel: [{ type: ObjectId, ref: "ExperienceLevel", required: true }],
  employerInformationDisplay: { type: Boolean, default: false },
  salary: {
    min: { type: Number },
    max: { type: Number }
  },
  currency: {
    type: ObjectId,
    ref: "Currency"
  }
});

jobOpportunitySchema.pre("save", async function (next) {
  try {
    if (!this.jobOpportunityId) {
      const counter = await Counter.findOneAndUpdate(
        { name: "jobOpportunityId" },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );
      this.jobOpportunityId = counter.seq;
    }

    next();
  } catch (err) {
    console.error("خطا در pre-save خبر:", err);
    next(err);
  }
});
module.exports = mongoose.model("JobOpportunity", jobOpportunitySchema);
