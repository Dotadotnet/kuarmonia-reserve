const mongoose = require("mongoose");
const { Schema } = mongoose;
const baseSchema = require("./baseSchema.model");
const Counter = require("./counter");
const {
  generateSlug,
 } = require("../utils/translationUtils");

const propertyTypeSchema = new Schema({
  title: { type: String, required: true },
  slug: {
    type: String,
    unique: true
  },
  typeId: {
    type: Number,
    unique: true,
  },
  amenities: [{ type: String }],
  creator: {
    type: Schema.Types.ObjectId,
    ref: "Admin",
    required: [true, "شناسه نویسنده الزامی است"]
  },
  canonicalUrl: {
    type: String,
    required: false,
    trim: true,
    validate: {
      validator: function (v) {
        return /^(https?:\/\/[^\s$.?#].[^\s]*)$/.test(v);
      },
      message: "URL معتبر نیست"
    }
  },
  icon: { type: String, required: false },
  description: { type: String, required: true },
  ...baseSchema.obj,
});
const defaultDomain = process.env.API;

propertyTypeSchema.pre("save", async function (next) {
  try {
    if (this.isNew) {
      const counter = await Counter.findOneAndUpdate(
        { name: "propertyTypeId" },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );
      this.typeId = counter.seq;
    }
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

const PropertyType = mongoose.model("PropertyType", propertyTypeSchema);
module.exports = PropertyType;
