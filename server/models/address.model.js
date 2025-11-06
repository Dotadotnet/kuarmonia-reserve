const mongoose = require("mongoose");
const Counter = require("./counter");
const { ObjectId } = mongoose.Schema.Types;

const addressSchema = new mongoose.Schema(
  {
    addressId: {
      type: Number,
      unique: true
    },

    country: {
      fa: { 
        type: String,
        default: "ایران",
        trim: true,
        maxLength: [100, "نام کشور نباید بیشتر از 100 کاراکتر باشد"]
      },
      en: { 
        type: String,
        default: "Iran",
        trim: true,
        maxLength: [100, "Country name should not exceed 100 characters"]
      },
      tr: { 
        type: String,
        default: "İran",
        trim: true,
        maxLength: [100, "Ülke adı 100 karakteri aşmamalıdır"]
      }
    },
    state: {
      fa: { 
        type: String,
        trim: true,
        maxLength: [100, "نام استان نباید بیشتر از 100 کاراکتر باشد"]
      },
      en: { 
        type: String,
        trim: true,
        maxLength: [100, "State name should not exceed 100 characters"]
      },
      tr: { 
        type: String,
        trim: true,
        maxLength: [100, "Eyalet adı 100 karakteri aşmamalıdır"]
      }
    },
    city: {
      fa: { 
        type: String,
        trim: true,
        maxLength: [100, "نام شهر نباید بیشتر از 100 کاراکتر باشد"]
      },
      en: { 
        type: String,
        trim: true,
        maxLength: [100, "City name should not exceed 100 characters"]
      },
      tr: { 
        type: String,
        trim: true,
        maxLength: [100, "Şehir adı 100 karakteri aşmamalıdır"]
      }
    },
    street: {
      fa: { 
        type: String,
        trim: true,
        maxLength: [200, "نام خیابان نباید بیشتر از 200 کاراکتر باشد"]
      },
      en: { 
        type: String,
        trim: true,
        maxLength: [200, "Street name should not exceed 200 characters"]
      },
      tr: { 
        type: String,
        trim: true,
        maxLength: [200, "Sokak adı 200 karakteri aşmamalıdır"]
      }
    },
    plateNumber: {
      type: String,
      trim: true
    },

phone: {
  type: String,
  unique: true,
  required: [true, "لطفا شماره تماس خود را وارد کنید"],
  validate: {
    validator: function(v) {
      // فقط اعداد، طول بین 11 تا 15
      return /^\d{11,15}$/.test(v);
    },
    message: "شماره تماس باید فقط عدد باشد و بین 11 تا 15 رقم باشد"
  }
},
    email: {
      type: String,
      unique: true,
      match: [
        /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
        "ایمیل وارد شده معتبر نیست"
      ]
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
      type: String
    },
    website: {
      type: String,
      trim: true,
      match: [
        /^(https?:\/\/)?([\w\-]+\.)+[\w\-]{2,}(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/,
        "آدرس وب‌سایت معتبر نیست"
      ]
    },
    location: {
      type: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true }
      }
    },
    creator: {
      type: ObjectId,
      ref: "Admin"
    },
    admin: {
      type: ObjectId,
      ref: "َAdmin"
    },
    user: {
      type: ObjectId,
      ref: "User"
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