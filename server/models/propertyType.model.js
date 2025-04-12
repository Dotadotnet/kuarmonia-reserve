const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const Tag = require("./tag.model");
const Category = require("./category.model");
const Counter = require("./counter")
const baseSchema = require("./baseSchema.model");
const { Schema } = mongoose;

const propertyTypeSchema = new Schema({
  title: { type: String, required: true },
  slug: {
    type: String,
    unique: true,
    required: false,
    default: function() {
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
  
  amenities: [{ type: String }],
  creator: {
    type: Schema.Types.ObjectId,
    ref: "Admin",
    required: [true, "شناسه نویسنده الزامی است"]
  },
  icon: { type: String, required: false },
  description: { type: String, required: true },
  ...baseSchema.obj,
});

propertyTypeSchema.pre('save', async function(next) {
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

const PropertyType = mongoose.model("PropertyType", propertyTypeSchema);

module.exports = PropertyType;