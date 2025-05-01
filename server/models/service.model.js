const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const Counter = require("./counter");
const baseSchema = require("./baseSchema.model");

const {
  encodeBase62
} = require("../utils/translationUtils");

const serviceSchema = new mongoose.Schema(
  {
    serviceId: {
      type: Number,
      unique: true
    },

    translations: [
      {
        translation: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Translation",
          required: true
        },
        language: {
          type: String,
          enum: ["en", "tr", "ar"],
          required: true
        }
      }
    ],
  
    icon: {
      type: String,
      required: [true, " ایکون الزامی است"],
      description:
        "آیکون مربوط به نوع خدمت محل جشن، می‌تواند شامل یک کد یونیکد یا URL آیکون باشد"
    },
    thumbnail: {
      url: { type: String, required: true },
      public_id: { type: String, default: "N/A" }
    },
      tags: [
      {
        type: ObjectId,
        ref: "Tag",
        required: [true, "لطفاً حداقل یک تگ وارد کنید"]
      }
    ],

    category: {
      type: ObjectId,
      ref: "Category",
      required: [true, "دسته‌بندی پست الزامی است"]
    },

    creator: {
      type: ObjectId,
      ref: "Admin",
      required: true
    },
    views: {
      type: Number,
      default: 0,
      min: [0, "تعداد بازدید نمی‌تواند منفی باشد"]
    },
    shortUrl: {
      type: String,
      unique: true
    },

    ...baseSchema.obj
  },
  { timestamps: true }
);

const defaultDomain = process.env.NEXT_PUBLIC_CLIENT_URL;
serviceSchema.pre("save", async function (next) {
  try {
    
  

    if (!this.serviceId) {
      const counter = await Counter.findOneAndUpdate(
        { name: "serviceId" },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );
      this.serviceId = counter.seq;

      const base62Code = encodeBase62(this.serviceId);
      this.shortUrl = `${defaultDomain}/s/${base62Code}`;
    }


    next();
  } catch (err) {
    console.error("خطا در pre-save خدمت:", err);
    next(err);
  }
});

const Service = mongoose.model("Service", serviceSchema);
module.exports = Service;
