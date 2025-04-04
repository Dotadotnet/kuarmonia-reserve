/* External Imports */
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const baseSchema = require("./baseSchema.model");
const Counter = require("./counter");

const venueServiceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "نام خدمات محل جشن الزامی است"],
      unique: true,
      trim: true,
      minLength: [3, "نام خدمات محل جشن باید حداقل ۳ کاراکتر باشد"],
      maxLength: [50, "نام خدمات محل جشن نمی‌تواند بیشتر از ۵۰ کاراکتر باشد"]
    },
    description: {
      type: String,
      maxLength: [500, "توضیحات نمی‌تواند بیشتر از ۵۰۰ کاراکتر باشد"]
    },
    icon: {
      type: String,
      required: false, // می‌تواند اختیاری باشد
      description:
        "آیکون مربوط به خدمات محل جشن، می‌تواند شامل یک کد یونیکد یا URL آیکون باشد"
    },
    creator: {
      type: ObjectId,
      ref: "Admin",
      required: [true, "شناسه مدیر الزامی است"],
    },
    venueServiceId: {
      type: Number,
    },
    ...baseSchema.obj,
  },
  { timestamps: true }
);

venueServiceSchema.pre("save", async function (next) {
  try {
    const counter = await Counter.findOneAndUpdate(
      { name: "venueServiceId" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    this.venueServiceId = counter.seq;
    next();
  } catch (error) {
    next(error);
  }
});

const VenueService = mongoose.model("VenueService", venueServiceSchema);

module.exports = VenueService;
