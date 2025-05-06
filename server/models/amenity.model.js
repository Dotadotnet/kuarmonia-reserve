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
        },
        language: {
          type: String,
          enum: ["en", "tr", "fa"],
        }
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Amenity", amenitySchema);
