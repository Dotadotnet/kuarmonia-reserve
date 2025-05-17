const mongoose = require("mongoose");
const Counter = require("./counter");
const { ObjectId } = mongoose.Schema.Types;
const baseSchema = require("./baseSchema.model");

const immigrationOpportunitySchema = new mongoose.Schema({
  immigrationOpportunityId: {
    type: Number,
    unique: true
  },
  visaType: { type: ObjectId, ref: "Visa" },
  fee: { type: String },
  ...baseSchema
});

immigrationOpportunitySchema.pre("save", async function (next) {
  try {
    if (!this.immigrationOpportunityId) {
      const counter = await Counter.findOneAndUpdate(
        { name: "immigrationOpportunityId" },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );
      this.immigrationOpportunityId = counter.seq;
    }

    next();
  } catch (err) {
    console.error("خطا در pre-save فرصت مهاجرتی:", err);
    next(err);
  }
});

module.exports = mongoose.model(
  "ImmigrationOpportunity",
  immigrationOpportunitySchema
);
