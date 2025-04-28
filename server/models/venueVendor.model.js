/* External Imports */
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const baseSchema = require("./baseSchema.model");
const Counter = require("./counter");

const venueVendorSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "عنوان تأمین‌کننده الزامی است"],
      trim: true,
      minlength: [3, "عنوان باید حداقل ۳ کاراکتر باشد"],
      maxlength: [100, "عنوان نمی‌تواند بیشتر از ۱۰۰ کاراکتر باشد"]
    },
    description: {
      type: String,
      trim: true
    },
    translations: [
      {
        type: ObjectId,
        ref: "Translation"
      }
    ],

    category: {
      type: ObjectId,
      ref: "Category",
      required: [true, "دسته‌بندی فروشنده الزامی است"]
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
    phone: {
      type: String,
      trim: true,
      required: [true, "شماره تماس الزامی است"],
      match: [
        /^(\+?\d{1,4}[-\s()]*)?(\d{2,4}[-\s()]*){2,5}$/,
        "شماره تماس وارد شده معتبر نیست"
      ]
    },

    email: {
      type: String,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "ایمیل وارد شده معتبر نیست"]
    },

    city: {
      type: String,
      required: [true, "نام شهر الزامی است"],
      trim: true,
      maxlength: [100, "نام شهر نمی‌تواند بیشتر از ۱۰۰ کاراکتر باشد"]
    },
    country: {
      type: String,
      required: [true, "کشور الزامی است"],
      trim: true,
      minlength: [2, "نام کشور باید حداقل ۲ کاراکتر باشد"],
      maxlength: [100, "نام کشور نمی‌تواند بیشتر از ۱۰۰ کاراکتر باشد"]
    },

    socialLinks: [
      {
        link: {
          type: String,
          required: [true, "آدرس شبکه اجتماعی الزامی است"]
        },
        network: {
          type: ObjectId,
          ref: "SocialLink",
          required: [true, "نوع شبکه اجتماعی الزامی است"]
        }
      }
    ],
    creator: {
      type: ObjectId,
      ref: "Admin",
      required: [true, "شناسه مدیر الزامی است"]
    },
    venueVendorId: {
      type: Number
    },
    ...baseSchema.obj
  },
  { timestamps: true }
);

venueVendorSchema.pre("save", async function (next) {
  try {
    const counter = await Counter.findOneAndUpdate(
      { name: "venueVendorId" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    this.venueVendorId = counter.seq;
    next();
  } catch (error) {
    next(error);
  }
});

const VenueVendor = mongoose.model("VenueVendor", venueVendorSchema);

module.exports = VenueVendor;
