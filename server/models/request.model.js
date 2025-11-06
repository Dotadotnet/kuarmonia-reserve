const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
    },
    file: {
      url: {
        type: String,
        default: "",
      },
      public_id: {
        type: String,
        default: "",
      },
    },
    status: {
      type: String,
      enum: ["pending", "reviewed", "completed"],
      default: "pending",
    },
    serviceType: {
      type: String,
      required: true,
      enum: ["visa", "service", "other"],
    },
    // New fields to store specific visa or service information
    specificTypeId: {
      type: mongoose.Schema.Types.ObjectId,
            required: true,

    },
    serviceTypeRef: {
      type: String,
      enum: ["Visa", "Service"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Request", requestSchema);