const mongoose = require("mongoose");
const { Schema } = mongoose;
const baseSchema = require("./baseSchema.model");
const Counter = require("./counter");
const { generateSlug } = require("../utils/translationUtils");
const { ObjectId } = mongoose.Schema.Types;

const saleTypeSchema = new Schema({
  title: { type: String, required: true },
  slug: {
    type: String,
    unique: true
  },
  saleTypeId: {
    type: Number,
    unique: true
  },
  translations: [
    {
      translationId: {
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
  creator: {
    type: Schema.Types.ObjectId,
    ref: "Admin",
    required: [true, "شناسه نویسنده الزامی است"]
  },
  description: { type: String, required: true },
  ...baseSchema.obj
});
const defaultDomain = process.env.API;

saleTypeSchema.pre("save", async function (next) {
  try {
    const counter = await Counter.findOneAndUpdate(
      { name: "saleTypeId" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    this.saleTypeId = counter.seq;

    if (this.isModified("title")) {
      this.slug = await generateSlug(this.title);
    }
    if (!this.canonicalUrl) {
      this.canonicalUrl = `${defaultDomain}/tags/${this.slug}`;
    }
    next();
  } catch (error) {
    next(error);
  }
});

const SaleType = mongoose.model("SaleType", saleTypeSchema);
module.exports = SaleType;
