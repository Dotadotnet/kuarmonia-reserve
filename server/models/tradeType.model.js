const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const baseSchema = require("./baseSchema.model");
const { Schema } = mongoose;

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
    enum: ["deposit", "monthlyRent", "propertyValue", "installmentAmount", "totalPrice"],
    default: [],
  },  ...baseSchema.obj,
});

tradeTypeSchema.pre('save', async function (next) {
  if (this.isNew) {
    this.typeId = await getNextSequenceValue('typeId');
  }

  if (this.isModified('title')) {
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
});

const TradeType = mongoose.model("TradeType", tradeTypeSchema);
module.exports = TradeType;