const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const verificationCodeSchema = new mongoose.Schema(
  {
    user: {
      type: ObjectId,
      ref: "User"
    },
    address: {
      type: String,
      required: true,
    },
    code: {
      type: Number, // عددی باشد
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
      default: () => new Date(Date.now() + 3 * 60 * 1000), 
    },
    used: {
      type: Boolean,
      default: false, // بررسی مصرف‌شده بودن کد
    },
  },
  { timestamps: true }
);

// ایندکس TTL برای حذف خودکار بعد از ۳ دقیقه
verificationCodeSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const VerificationCode = mongoose.model("VerificationCode", verificationCodeSchema);
module.exports = VerificationCode;
