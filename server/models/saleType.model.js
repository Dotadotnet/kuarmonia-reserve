const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const baseSchema = require("./baseSchema.model");
const { Schema } = mongoose;

const saleTypeSchema = new Schema({
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
  saleTypeId: {
    type: Number,
    unique: true,
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: "Admin",
    required: [true, "شناسه نویسنده الزامی است"]
  },
  description: { type: String, required: true },
  ...baseSchema.obj,
});

saleTypeSchema.pre('save', async function(next) {
  if (this.isNew) {
    this.saleTypeId = await getNextSequenceValue('saleTypeId');
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

const SaleType = mongoose.model("SaleType", saleTypeSchema);
module.exports = SaleType;

// async function getNextSequenceValue(sequenceName) {
//   const sequenceDocument = await Counter.findOneAndUpdate(
//     { model: sequenceName },
//     { $inc: { sequence_value: 1 } },
//     { new: true, upsert: true }
//   );
//   return sequenceDocument.sequence_value;
// }
