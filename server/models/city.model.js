const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const Counter = require("./counter");
const baseSchema = require("./baseSchema.model");

const citySchema = new mongoose.Schema(
  {
    cityId: { type: Number, unique: true },
    name: { type: String, unique: true },

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

citySchema.pre("save", async function (next) {
  try {
    if (!this.cityId) {
      const counter = await Counter.findOneAndUpdate(
        { name: "cityId" },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );
      this.cityId = counter.seq;
    }
    next();
  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.model("City", citySchema);
