const mongoose = require("mongoose");
const { Schema } = mongoose;
const baseSchema = require("./baseSchema.model");
const Counter = require("./counter");
const { ObjectId } = mongoose.Schema.Types;

const saleTypeSchema = new Schema({

  saleTypeId: {
    type: Number,
    unique: true
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
  ...baseSchema.obj
});
saleTypeSchema.pre("save", async function (next) {
  try {
    const counter = await Counter.findOneAndUpdate(
      { name: "saleTypeId" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    this.saleTypeId = counter.seq;
    next();
  } catch (error) {
    next(error);
  }
});

const SaleType = mongoose.model("SaleType", saleTypeSchema);
module.exports = SaleType;
