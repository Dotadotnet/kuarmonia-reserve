const mongoose = require("mongoose");
const validator = require("validator");
const { ObjectId } = mongoose.Schema.Types;
const baseSchema = require("./baseSchema.model");
const Counter = require("./counter");

const userSchema = new mongoose.Schema(
  {
    userId: {
      type: Number,
      unique: true
    },
    googleId: {
      type: String,
      unique: true,
      sparse: true
    },
    name: {
      type: String,
      trim: true,
      maxLength: [100, "نام شما باید حداکثر 100 کاراکتر باشد"]
    },
    email: {
      type: String,
      validate: [validator.isEmail, "لطفا یک آدرس ایمیل معتبر وارد کنید"],
      unique: true,
      sparse: true
    },
    emailVerified: {
      type: Boolean,
      default: false
    },
    phone: {
      type: String,
      validate: {
        validator: (value) => /^09\d{9}$/.test(value),
        message: "شماره تماس معتبر نیست. باید با 09 شروع شود"
      },
      unique: true,
      sparse: true
    },
    phoneVerified: {
      type: Boolean,
      default: false
    },
    userLevel: {
      type: String,
      enum: ["basic", "verified", "completed"],
      default: "basic"
    },
    avatar: {
      url: {
        type: String,
        default: "https://placehold.co/300x300.png"
      },
      public_id: {
        type: String,
        default: "N/A"
      }
    },
    cart: [{ type: ObjectId, ref: "Cart" }],
    favorites: [{ type: ObjectId, ref: "Favorite" }],
    reviews: [{ type: ObjectId, ref: "Review" }],
    purchases: [{ type: ObjectId, ref: "Purchase" }],
    products: [{ type: ObjectId, ref: "Product" }],
    addresses: [{ type: ObjectId, ref: "Address" }],
    ...baseSchema.obj
  },
  { timestamps: true }
);

/* بررسی اینکه کاربر حداقل شماره تلفن یا حساب گوگل داشته باشد */
userSchema.pre("validate", function (next) {
  if (!this.phone && !this.googleId) {
    return next(
      new Error("کاربر باید حداقل شماره تلفن یا حساب گوگل داشته باشد.")
    );
  }
  next();
});

/* مقداردهی `userId` از `Counter` */
userSchema.pre("save", async function (next) {
  if (!this.isNew || this.userId) {
    return next();
  }
  try {
    const counter = await Counter.findOneAndUpdate(
      { name: "userId" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    this.userId = counter.seq;
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.pre("save", function (next) {
  if (this.googleId) {
    this.userLevel = "verified";
  } else if (this.phoneVerified || this.emailVerified) {
    this.userLevel = "verified";
  }

  if (this.addresses && this.addresses.length > 0) {
    this.userLevel = "completed";
  }

  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
