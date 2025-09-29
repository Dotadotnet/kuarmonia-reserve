const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const Counter = require("./counter");
const baseSchema = require("./baseSchema.model");

const countrySchema = new mongoose.Schema(
  {
    countryId: { type: Number, unique: true },
    name: { type: String, unique: true },
    translations: [
      {
        translation: { type: ObjectId, ref: "Translation", required: true },
        language: { type: String, enum: ["fa", "en", "tr"], required: true }
      }
    ],
    icon: {
      type: String,
      required: false,
      description:
        "آیکون مربوط به کشور خبر، می‌تواند شامل یک کد یونیکد یا URL آیکون باشد"
    },
    creator: {
      type: ObjectId,
      ref: "Admin",
      required: [true, "شناسه مدیر الزامی است"]
    },
    code: {
      type: String,
      required: [true, "شناسه کشور الزامی است"],
      unique: true
    },

  },
  
  { timestamps: true }
);

countrySchema.pre("save", async function (next) {
  try {
    if (!this.countryId) {
      const counter = await Counter.findOneAndUpdate(
        { name: "countryId" },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );
      this.countryId = counter.seq;
    }
    next();
  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.model("Country", countrySchema);
