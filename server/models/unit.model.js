const mongoose = require("mongoose");
const { Schema } = mongoose;

const unitSchema = new Schema(
  {
    floor: {
      type: Number,
    },
    bedrooms: {
      type: Number,
      default: 1
    },
    bathrooms: {
      type: Number,
      default: 1
    },
    square: {
      type: Number,
      required: [true, "مساحت الزامی است"]
    },
    price: {
      type: Number,
      required: [true, "قیمت الزامی است"]
    }
  },
  { timestamps: true }
);

const Unit = mongoose.model("Unit", unitSchema);

module.exports = Unit;
