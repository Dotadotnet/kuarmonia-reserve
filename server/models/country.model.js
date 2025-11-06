const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const Counter = require("./counter");
const baseSchema = require("./baseSchema.model");

const countrySchema = new mongoose.Schema(
  {
    countryId: { type: Number, unique: true },
    name: {
      fa: { 
        type: String,
        required: [true, "نام کشور الزامی است"],
        unique: true,
        trim: true,
        maxLength: [100, "نام کشور نباید بیشتر از 100 کاراکتر باشد"]
      },
      en: { 
        type: String,
        required: [true, "نام کشور الزامی است"],
        unique: true,
        trim: true,
        maxLength: [100, "نام کشور نباید بیشتر از 100 کاراکتر باشد"]
      },
      tr: { 
        type: String,
        required: [true, "نام کشور الزامی است"],
        unique: true,
        trim: true,
        maxLength: [100, "نام کشور نباید بیشتر از 100 کاراکتر باشد"]
      }
    },
    icon: {
      type: String,
      required: false,
      description:
        "آیکون مربوط به کشور خبر، می‌تواند شامل یک کد یونیکد یا URL آیکون باشد"
    },
    creator: {
      type: ObjectId,
      ref: "Admin",
      required: [true, "شناسه مدیر الزامی است"]
    },
    code: {
      type: String,
      required: [true, "شناسه کشور الزامی است"],
      unique: true
    },
    slug: {
      fa: { type: String, unique: true, index: true },
      en: { type: String, unique: true, index: true },
      tr: { type: String, unique: true, index: true }
    },
    status: {
      type: String,
      enum: ["draft", "published", "archived"],
      default: "draft"
    },
        ...baseSchema.obj
    
  },
{ 
    timestamps: true,
    strict: true  // Enable strict mode to prevent adding undefined fields
  }
);

countrySchema.pre("save", async function (next) {
  try {
    if (!this.countryId) {
      const counter = await Counter.findOneAndUpdate(
        { name: "countryId" },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );
      this.countryId = counter.seq;
    }
    next();
  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.model("Country", countrySchema);