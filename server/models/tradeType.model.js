const mongoose = require("mongoose");
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema.Types;
const baseSchema = require("./baseSchema.model");
const Counter = require("./counter");

const tradeTypeSchema = new Schema({
  typeId: {
    type: Number,
    unique: true,
  },
   translations: [
      {
        translation: {
          type: ObjectId,
          ref: "Translation",
          required: true
        },
        language: {
          type: String,
          enum: ["fa", "en", "tr"],
          required: true
        }
      }
    ],
  creator: {
    type: ObjectId,
    ref: "Admin",
    required: [true, "شناسه نویسنده الزامی است"]
  },
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
    if (this.isNew) {
      const counter = await Counter.findOneAndUpdate(
        { name: "tradeTypeId" },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );
      this.typeId = counter.seq;
    }


    next();
  } catch (error) {
    next(error);
  }
});

const TradeType = mongoose.model("TradeType", tradeTypeSchema);
module.exports = TradeType;
