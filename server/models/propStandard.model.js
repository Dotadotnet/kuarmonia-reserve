/* External Imports */
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const baseSchema = require("./baseSchema.model");
const Counter = require("./counter");

const propStandardSchema = new mongoose.Schema(
  {
    propStandardId: {
      type: Number,
      unique: true
    },
   translations: [
        {
          translationId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Translation",
            required: true
          },
          language: {
            type: String,
            enum: ["en", "tr", "ar"],
            required: true
          }
        }
      ],
    title: {
      type: String,
      required: [true, "عنوان استاندارد الزامی است"],
      trim: true,
      minlength: [3, "عنوان استاندارد باید حداقل ۳ کاراکتر باشد"],
      maxlength: [100, "عنوان استاندارد نمی‌تواند بیشتر از ۱۰۰ کاراکتر باشد"]
    },
    description: {
      type: String,
      required: [true, "لطفاً توضیحات لازم را وارد کنید"],
      trim: true
    },
    issuingOrganization: {
      type: String,
      required: [true, "نام سازمان صادرکننده الزامی است"],
      trim: true,
      minlength: [3, "نام سازمان صادرکننده باید حداقل ۳ کاراکتر باشد"],
      maxlength: [
        100,
        "نام سازمان صادرکننده نمی‌تواند بیشتر از ۱۰۰ کاراکتر باشد"
      ]
    },
    year: {
      type: Number,
      required: [true, "سال الزامی است"],
      min: [1900, "سال باید بعد از ۱۹۰۰ باشد"],
      max: [new Date().getFullYear(), `سال نمی‌تواند در آینده باشد`]
    },
    country: {
      type: String,
      required: [true, "کشور الزامی است"],
      trim: true,
      minlength: [2, "نام کشور باید حداقل ۲ کاراکتر باشد"],
      maxlength: [100, "نام کشور نمی‌تواند بیشتر از ۱۰۰ کاراکتر باشد"]
    },
    isInternational: {
      type: Boolean,
      default: false
    },
    thumbnail: {
      url: {
        type: String,
        required: [true, "لطفاً لینک تصویر بندانگشتی را وارد کنید"],
        default: "https://placehold.co/296x200.png"
      },
      public_id: {
        type: String,
        default: "N/A"
      }
    },
    referenceUrl: {
      type: String,
      required: false,
      match: [
        /^https?:\/\/.*$/,
        "آدرس لینک مطالعه بیشتر باید یک URL معتبر باشد"
      ]
    },
    creator: {
      type: ObjectId,
      ref: "Admin",
      required: [true, "شناسه مدیر الزامی است"],
    },
  
    ...baseSchema.obj,
  },
  { timestamps: true }
);

propStandardSchema.pre("save", async function (next) {
  try {
    const counter = await Counter.findOneAndUpdate(
      { name: "propStandardId" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    this.propStandardId = counter.seq;
    next();
  } catch (error) {
    next(error);
  }
});

const PropStandard = mongoose.model("PropStandard", propStandardSchema);

module.exports = PropStandard;
