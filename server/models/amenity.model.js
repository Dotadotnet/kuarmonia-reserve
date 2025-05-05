// models/amenity.model.js
const mongoose = require("mongoose");
const { Schema, Types } = mongoose;

const amenitySchema = new Schema(
  {

    hasAmenity: {
      type: Boolean,
      default: false
    },
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
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Amenity", amenitySchema);
