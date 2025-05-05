const mongoose = require("mongoose");
const Counter = require("./counter");
const {  Types } = mongoose;

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
      trim: true
    },
    city: {
      type: String,
      trim: true
    },
    street: {
      type: String,
      trim: true
    },
    plateNumber: {
      type: String,
      trim: true
    },
   
    phone: { 
      type: String, 
      required: [true, 'لطفا شماره تماس خود را وارد کنید'],
      match: [/^\+?[1-9]\d{1,14}$/, 'شماره تماس باید فرمت بین‌المللی داشته باشد']
    },
    email: { 
      type: String, 
      match: [/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/, 'ایمیل وارد شده معتبر نیست']
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
