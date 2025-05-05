const mongoose = require("mongoose");
const { Schema, Types } = mongoose;

const propEventSpaceSchema = new Schema({
  
  translations: [
    {
      translation: {
        type: Types.ObjectId,
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
  squareFootage: String,
  spaces: [
    {
      public_id: { type: String, required: true },
      alt: String,
      caption: String
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model("PropEventSpace", propEventSpaceSchema);
