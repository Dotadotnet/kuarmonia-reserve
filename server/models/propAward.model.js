/* External Imports */
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const baseSchema = require("./baseSchema.model");
const Counter = require("./counter");

const propAwardSchema = new mongoose.Schema(
  {
   
   
    translations: [
         {
           translation: {
             type: ObjectId,
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
    year: {
      type: Number,
      required: [true, "سال الزامی است"],
      min: [1900, "سال باید بعد از ۱۹۰۰ باشد"],
      max: [new Date().getFullYear(), `سال نمی‌تواند در آینده باشد`]
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
    propAwardId: {
      type: Number,
    },
    ...baseSchema.obj,
  },
  { timestamps: true }
);

propAwardSchema.pre("save", async function (next) {
  try {
    const counter = await Counter.findOneAndUpdate(
      { name: "propAwardId" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    this.propAwardId = counter.seq;
    next();
  } catch (error) {
    next(error);
  }
});

const PropAward = mongoose.model("PropAward", propAwardSchema);

module.exports = PropAward;
