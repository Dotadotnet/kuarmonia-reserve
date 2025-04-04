const mongoose = require("mongoose");
const Counter = require("./counter");

const addressSchema = new mongoose.Schema(
  {
    addressId: {
      type: Number,
      unique: true
    },
    country: {
      type: String,
      default: "ایران",
      trim: true
    },
    state: {
      type: String,
      required: [true, "لطفا استان را وارد کنید"],
      trim: true
    },
    city: {
      type: String,
      required: [true, "لطفا شهر را وارد کنید"],
      trim: true
    },
    street: {
      type: String,
      required: [true, "لطفا خیابان را وارد کنید"],
      trim: true
    },
    plateNumber: {
      type: String,
      required: [true, "لطفا پلاک را وارد کنید"],
      trim: true
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

    floor: {
      type: String,
      default: "همکف",
      trim: true
    },
    unit: {
      type: String,
      trim: true
    },
    postalCode: {
      type: String,
      required: [true, "لطفا کد پستی را وارد کنید"],
      validate: {
        validator: (value) => /^\d{10}$/.test(value),
        message: "کد پستی باید ۱۰ رقم باشد"
      }
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "َAdmin"
    }
  },
  { timestamps: true }
);

addressSchema.pre("save", async function (next) {
  if (!this.isNew || this.addressId) {
    return next();
  }

  try {
    const counter = await Counter.findOneAndUpdate(
      { name: "addressId" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    this.addressId = counter.seq;
    next();
  } catch (error) {
    next(error);
  }
});

const Address = mongoose.model("Address", addressSchema);
module.exports = Address;
