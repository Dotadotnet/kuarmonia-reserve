/* External Imports */
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const baseSchema = require("./baseSchema.model");
const Counter = require("./counter");

const venueAmenitySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "نام امکانات محل جشن الزامی است"],
      unique: true,
      trim: true,
      minLength: [3, "نام امکانات محل جشن باید حداقل ۳ کاراکتر باشد"],
      maxLength: [50, "نام امکانات محل جشن نمی‌تواند بیشتر از ۵۰ کاراکتر باشد"]
    },
    slug: {
      type: String,
      unique: true,
    },
    translations: [
      {
        type: ObjectId,
        ref: "Translation"
      }
    ],
    description: {
      type: String,
      maxLength: [500, "توضیحات نمی‌تواند بیشتر از ۵۰۰ کاراکتر باشد"]
    },
    icon: {
      type: String,
      required: false, // می‌تواند اختیاری باشد
      description:
        "آیکون مربوط به امکانات محل جشن، می‌تواند شامل یک کد یونیکد یا URL آیکون باشد"
    },
    creator: {
      type: ObjectId,
      ref: "Admin",
      required: [true, "شناسه مدیر الزامی است"],
    },
    venueAmenityId: {
      type: Number,
    },
    ...baseSchema.obj,
  },
  { timestamps: true }
);

venueAmenitySchema.pre("save", async function (next) {
  try {
    const counter = await Counter.findOneAndUpdate(
      { name: "venueAmenityId" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    this.venueAmenityId = counter.seq;
    next();
  } catch (error) {
    next(error);
  }
});

const VenueAmenity = mongoose.model("VenueAmenity", venueAmenitySchema);

module.exports = VenueAmenity;
