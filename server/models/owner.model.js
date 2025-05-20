const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const Counter = require("./counter");
const baseSchema = require("./baseSchema.model");

const ownerSchema = new mongoose.Schema(
  {
    ownerId: { type: Number, unique: true },
    translations: [
      {
        translation: { type: ObjectId, ref: "Translation", required: true },
        language: { type: String, enum: ["fa", "en", "tr"], required: true }
      }
    ],
     employerImage: {
      url: {
        type: String,
        default: "https://placehold.co/296x200.png"
      },
      public_id: {
        type: String,
        default: "N/A"
      }
    },

   ...baseSchema.obj
  },
  { timestamps: true }
);

ownerSchema.pre("save", async function (next) {
  try {
    if (!this.ownerId) {
      const counter = await Counter.findOneAndUpdate(
        { name: "ownerId" },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );
      this.ownerId = counter.seq;
    }
    next();
  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.model("Owner", ownerSchema);
