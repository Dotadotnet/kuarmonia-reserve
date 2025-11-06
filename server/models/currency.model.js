/* External Imports */
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const baseSchema = require("./baseSchema.model");
const Counter = require("./counter");

const currencySchema = new mongoose.Schema(
  {
    title: {
      fa: { 
        type: String,
        required: [true, "نام ارز الزامی است"],
        trim: true,
        maxLength: [50, "نام ارز نباید بیشتر از ۵۰ کاراکتر باشد"]
      },
      en: { 
        type: String,
        required: [true, "نام ارز الزامی است"],
        trim: true,
        maxLength: [50, "نام ارز نباید بیشتر از ۵۰ کاراکتر باشد"]
      },
      tr: { 
        type: String,
        required: [true, "نام ارز الزامی است"],
        trim: true,
        maxLength: [50, "نام ارز نباید بیشتر از ۵۰ کاراکتر باشد"]
      }
    },
    code: {
      type: String,
      required: [true, "کد ارز الزامی است"],
      trim: true,
      uppercase: true,
      unique: true,
      maxLength: [10, "کد ارز نباید بیشتر از ۱۰ کاراکتر باشد"],
    },
    symbol: {
      type: String,
      required: [true, "نماد ارز الزامی است"],
      trim: true,
    },
    exchangeRate: {
      type: Number,
      required: [true, "نرخ تبدیل ارز الزامی است"],
      min: [0, "نرخ تبدیل نمی‌تواند منفی باشد"],
    },
    country: {
      type: ObjectId,
      ref: "Country",
      required: [true, "کشور الزامی است"]
    },
    creator: {
      type: ObjectId,
      ref: "Admin",
      required: [true, "شناسه مدیر الزامی است"],
    },
    currencyId: {
      type: Number,
    },
    ...baseSchema.obj,
  },
  { timestamps: true }
);

currencySchema.pre("save", async function (next) {
  try {
    const counter = await Counter.findOneAndUpdate(
      { name: "currencyId" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    this.currencyId = counter.seq;
    next();
  } catch (error) {
    next(error);
  }
});

const Currency = mongoose.model("Currency", currencySchema);

module.exports = Currency;