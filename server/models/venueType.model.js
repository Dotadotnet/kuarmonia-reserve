/* External Imports */
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const baseSchema = require("./baseSchema.model");
const Counter = require("./counter");

const venueTypeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "نام نوع محل جشن الزامی است"],
      unique: true,
      trim: true,
      minLength: [3, "نام نوع محل جشن باید حداقل ۳ کاراکتر باشد"],
      maxLength: [50, "نام نوع محل جشن نمی‌تواند بیشتر از ۵۰ کاراکتر باشد"]
    },
    description: {
      type: String,
      maxLength: [500, "توضیحات نمی‌تواند بیشتر از ۵۰۰ کاراکتر باشد"]
    },
    icon: {
      type: String,
      required: false, // می‌تواند اختیاری باشد
      description:
        "آیکون مربوط به نوع محل جشن، می‌تواند شامل یک کد یونیکد یا URL آیکون باشد"
    },
    creator: {
      type: ObjectId,
      ref: "Admin",
      required: [true, "شناسه مدیر الزامی است"],
    },
    venueTypeId: {
      type: Number,
    },
    ...baseSchema.obj,
  },
  { timestamps: true }
);

venueTypeSchema.pre("save", async function (next) {
  try {
    const counter = await Counter.findOneAndUpdate(
      { name: "venueTypeId" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    this.venueTypeId = counter.seq;
    next();
  } catch (error) {
    next(error);
  }
});

const VenueType = mongoose.model("VenueType", venueTypeSchema);

module.exports = VenueType;
