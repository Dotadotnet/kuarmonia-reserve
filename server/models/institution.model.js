const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const Counter = require("./counter");
const baseSchema = require("./baseSchema.model");

const institutionSchema = new mongoose.Schema(
  {
    institutionId: { type: Number, unique: true },
    type: {
      type: ObjectId,
      ref: "InstitutionType",
      required: true
    },
    thumbnail: {
      url: {
        type: String,
        required: [true, "وارد کردن آدرس تصویر الزامی است"],
        default: "https://placehold.co/296x200.png"
      },
      public_id: {
        type: String,
        required: [true, "شناسه تصویر الزامی است"],
        default: "N/A"
      }
    },
    awards: [{ type: ObjectId, ref: "Award" }],
    standards: [{ type: ObjectId, ref: "Standard" }],
    isInternational: {
      type: Boolean,
      default: false
    },
    translations: [
      {
        translation: {
          type: ObjectId,
          ref: "Translation",
          required: true
        },
        language: {
          type: String,
          enum: ["fa", "en", "tr"],
          required: true
        }
      }
    ],
    address: [{ type: ObjectId, ref: "Address" }],

    creator: {
      type: ObjectId,
      ref: "Admin"
    },

    ...baseSchema.obj
  },
  { timestamps: true }
);

institutionSchema.pre("save", async function (next) {
  try {
    if (!this.institutionId) {
      const counter = await Counter.findOneAndUpdate(
        { name: "institutionId" },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );
      this.institutionId = counter.seq;
    }
    next();
  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.model("Institution", institutionSchema);
