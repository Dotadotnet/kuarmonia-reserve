/* External Imports */
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const baseSchema = require("./baseSchema.model");
const Counter = require("./counter");

const venueSettingSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "نام تنظیمات محل جشن الزامی است"],
      unique: true,
      trim: true,
      minLength: [3, "نام تنظیمات محل جشن باید حداقل ۳ کاراکتر باشد"],
      maxLength: [50, "نام تنظیمات محل جشن نمی‌تواند بیشتر از ۵۰ کاراکتر باشد"]
    },
    
    description: {
      type: String,
      maxLength: [500, "توضیحات نمی‌تواند بیشتر از ۵۰۰ کاراکتر باشد"]
    },
    translations: [
      {
        type: ObjectId,
        ref: "Translation"
      }
    ],
    icon: {
      type: String,
      required: false, // می‌تواند اختیاری باشد
      description:
        "آیکون مربوط به تنظیمات محل جشن، می‌تواند شامل یک کد یونیکد یا URL آیکون باشد"
    },
    creator: {
      type: ObjectId,
      ref: "Admin",
      required: [true, "شناسه مدیر الزامی است"],
    },
    venueSettingId: {
      type: Number,
    },
    ...baseSchema.obj,
  },
  { timestamps: true }
);

venueSettingSchema.pre("save", async function (next) {
  try {
    const counter = await Counter.findOneAndUpdate(
      { name: "venueSettingId" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    this.venueSettingId = counter.seq;
    next();
  } catch (error) {
    next(error);
  }
});

const VenueSetting = mongoose.model("VenueSetting", venueSettingSchema);

module.exports = VenueSetting;
