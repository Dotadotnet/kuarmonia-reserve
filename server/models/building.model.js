const mongoose = require("mongoose");
const { Schema } = mongoose;

const buildingSchema = new Schema(
  {
    totalFloors: {
      type: Number,
    },
    totalUnits: {
      type: Number,
    },
    bedrooms: [
      {
        type: Number
      }
    ],
    square: [
      {
        type: Number
      }
    ]
  },
  { timestamps: true }
);


const Building = mongoose.model("Building", buildingSchema);

module.exports = Building;
