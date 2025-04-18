const mongoose = require("mongoose");
const { Schema } = mongoose;
const baseSchema = require("./baseSchema.model");
const Counter = require("./counter");

const tradeTypeSchema = new Schema({
  title: { type: String, required: true },
  slug: {
    type: String,
    unique: true,
    required: false,
    default: function () {
      return this.title.toString()
        .trim()
        .toLowerCase()
        .replace(/[\u200B-\u200D\uFEFF]/g, "")
        .replace(/[\s\ـ]+/g, "-")
        .replace(/[^\u0600-\u06FFa-z0-9\-]/g, "")
        .replace(/-+/g, "-")
        .replace(/^-+|-+$/g, "");
    },
  },
  typeId: {
    type: Number,
    unique: true,
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: "Admin",
    required: [true, "شناسه نویسنده الزامی است"]
  },
  description: { type: String, required: true },
  priceFields: {
    type: [String],
    enum: {
      values: ["deposit", "monthlyRent", "propertyValue", "installmentAmount", "totalPrice"],
      message: "نوع قیمت گذاری نامعتبر است"
    },
    required: [true, "نوع قیمت گذاری الزامی است"]
  },
  ...baseSchema.obj,
});

tradeTypeSchema.pre("save", async function (next) {
  try {
    // فقط زمانی مقداردهی شود که جدید است
    if (this.isNew) {
      const counter = await Counter.findOneAndUpdate(
        { name: "tradeTypeId" },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );
      this.typeId = counter.seq;
    }

    if (this.isModified("title")) {
      this.slug = this.title.toString()
        .trim()
        .toLowerCase()
        .replace(/[\u200B-\u200D\uFEFF]/g, "")
        .replace(/[\s\ـ]+/g, "-")
        .replace(/[^\u0600-\u06FFa-z0-9\-]/g, "")
        .replace(/-+/g, "-")
        .replace(/^-+|-+$/g, "");
    }

    next();
  } catch (error) {
    next(error);
  }
});

const TradeType = mongoose.model("TradeType", tradeTypeSchema);
module.exports = TradeType;
