const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const { ObjectId } = mongoose.Schema.Types;
const baseSchema = require("./baseSchema.model");
const Counter = require("./counter");
const adminSchema = new mongoose.Schema(
  {
    adminId: {
      type: Number,
      unique: true
    },
    name: {
      type: String,
      validate: {
        validator: function (value) {
          if (this.role === "admin" || this.role === "superAdmin") {
            return !!value;
          }
          return true;
        },
        message: "برای نقش مدیر یا مدیر کل، وارد کردن نام الزامی است"
      },
      trim: true,
      maxLength: [100, "نام شما باید حداکثر 100 کاراکتر باشد"]
    },

    email: {
      type: String,
      validate: {
        validator: function (value) {
          if (this.role === "admin" || this.role === "superAdmin") {
            return validator.isEmail(value);
          }
          return true;
        },
        message: "برای نقش مدیر یا مدیر کل، وارد کردن ایمیل معتبر الزامی است"
      },
      validate: [validator.isEmail, "لطفا یک آدرس ایمیل معتبر وارد کنید"],
      unique: [true, "این ایمیل قبلا ثبت شده است. لطفا ایمیل جدید وارد کنید"]
    },
    translations: [
      {
        type: ObjectId,
        ref: "Translation"
      }
    ],
    password: {
      type: String,
      required: [true, "لطفا یک رمز عبور قوی وارد کنید"],
      minLength: [6, "رمز عبور باید حداقل 6 کاراکتر باشد"],
      maxLength: [20, "رمز عبور باید حداکثر 20 کاراکتر باشد"]
    },

    avatar: {
      url: {
        type: String,
        default: "https://placehold.co/300x300.png",
        validate: {
          validator: function (value) {
            if (this.role === "admin" || this.role === "superAdmin") {
              return value && value !== "https://placehold.co/300x300.png";
            }
            return true;
          },
          message: "برای نقش مدیر یا مدیر کل، وارد کردن آواتار الزامی است"
        }
      },
      public_id: {
        type: String,
        default: "N/A"
      }
    },

    phone: {
      type: String,
      required: [true, "لطفا شماره تماس خود را وارد کنید"],
      validate: {
        validator: (value) => /^09\d{9}$/.test(value),
        message:
          "شماره تماس {VALUE} معتبر نیست. شماره باید 11 رقم باشد و با 09 شروع شود"
      },
      unique: true
    },

    role: {
      type: String,
      enum: ["superAdmin", "admin", "operator"],
      default: "operator"
    },

    adminLevel: {
      type: String,
      enum: ["basic", "verified", "completed"],
      default: "basic",
      require: true
    },
    address: {
      type: ObjectId,
      ref: "Address"
    },

    ...baseSchema.obj
  },
  { timestamps: true }
);

adminSchema.methods.encryptedPassword = function (password) {
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  return hashedPassword;
};

adminSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) {
      return next();
    }

    this.password = this.encryptedPassword(this.password);
  } catch (error) {
    next(error);
  }
});

adminSchema.pre("save", async function (next) {
  if (!this.isNew || this.adminId) {
    return next();
  }

  try {
    const counter = await Counter.findOneAndUpdate(
      { name: "adminId" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    this.adminId = counter.seq;
    next();
  } catch (error) {
    next(error);
  }
});

adminSchema.methods.comparePassword = function (password, hash) {
  const isPasswordValid = bcrypt.compareSync(password, hash);
  return isPasswordValid;
};

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
