/* External Imports */
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const baseSchema = require("./baseSchema.model");
const Counter = require("./counter");

const ceremonyTypeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "نام نوع مراسم الزامی است"],
      unique: true,
      trim: true,
      minLength: [3, "نام نوع مراسم باید حداقل ۳ کاراکتر باشد"],
      maxLength: [50, "نام نوع مراسم نمی‌تواند بیشتر از ۵۰ کاراکتر باشد"]
    },
    description: {
      type: String,
      maxLength: [500, "توضیحات نمی‌تواند بیشتر از ۵۰۰ کاراکتر باشد"]
    },
    icon: {
      type: String,
      required: false, // می‌تواند اختیاری باشد
      description:
        "آیکون مربوط به نوع مراسم، می‌تواند شامل یک کد یونیکد یا URL آیکون باشد"
    },
    creator: {
      type: ObjectId,
      ref: "Admin",
      required: [true, "شناسه مدیر الزامی است"],
    },
    ceremonyTypeId: {
      type: Number,
    },
    ...baseSchema.obj,
  },
  { timestamps: true }
);

ceremonyTypeSchema.pre("save", async function (next) {
  if (this.ceremonyTypeId) return next(); // جلوگیری از تغییر ID در بروزرسانی

  try {
    const counter = await Counter.findOneAndUpdate(
      { name: "ceremonyTypeId" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    this.ceremonyTypeId = counter.seq;
    next();
  } catch (error) {
    next(error);
  }
});

ceremonyTypeSchema.post("save", function (error, doc, next) {
  if (error.code === 11000) {
    next(new Error("نام نوع مراسم قبلاً ثبت شده است. لطفاً نام دیگری انتخاب کنید."));
  } else {
    next(error);
  }
});

const CeremonyType = mongoose.model("CeremonyType", ceremonyTypeSchema);

module.exports = CeremonyType;
