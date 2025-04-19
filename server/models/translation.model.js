const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const translationSchema = new mongoose.Schema(
  {
    language: { type: String, enum: [ "en", "tr"], required: true },

    refModel: { type: String, required: true },
    refId: { type: ObjectId, required: true }, 

    fields: {
      type: Map,
      of: mongoose.Schema.Types.Mixed,
      required: true,
    },
  },
  { timestamps: true }
);

translationSchema.index({ language: 1, refModel: 1, refId: 1 }, { unique: true });

module.exports = mongoose.model("Translation", translationSchema);
