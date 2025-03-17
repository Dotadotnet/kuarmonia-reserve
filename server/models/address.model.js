const mongoose = require("mongoose");
const Counter = require("./counter");

const addressSchema = new mongoose.Schema({
  addressId: {
    type: Number,
    unique: true,
  },
  country: {
    type: String,
    default: "ایران",
    trim: true,
  },
  province: {
    type: String,
    required: [true, "لطفا استان را وارد کنید"],
    trim: true,
  },
  city: {
    type: String,
    required: [true, "لطفا شهر را وارد کنید"],
    trim: true,
  },
  street: {
    type: String,
    required: [true, "لطفا خیابان را وارد کنید"],
    trim: true,
  },
  plateNumber: {
    type: String,
    required: [true, "لطفا پلاک را وارد کنید"],
    trim: true,
  },
  floor: {
    type: String,
    default: "همکف",
    trim: true,
  },
  unit: {
    type: String,
    required: [true, "لطفا شماره واحد را وارد کنید"],
    trim: true,
  },
  postalCode: {
    type: String,
    required: [true, "لطفا کد پستی را وارد کنید"],
    validate: {
      validator: (value) => /^\d{10}$/.test(value),
      message: "کد پستی باید ۱۰ رقم باشد",
    },
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
}, { timestamps: true });

/* مقداردهی خودکار addressId با Counter */
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
