/* external imports */
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const baseSchema = require("./baseSchema.model");
const Counter = require("./counter");

const iconSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "عنوان آیکون الزامی است"],
      trim: true,
      maxLength: [100, "عنوان آیکون نباید بیشتر از 100 کاراکتر باشد"]
    },

    symbol: { type: String, required: true },
    creator: {
      type: ObjectId,
      ref: "Admin",
      required: [true, "شناسه نویسنده الزامی است"]
    },

    iconId: {
      type: Number
    },

    ...baseSchema.obj
  },
  { timestamps: true }
);

iconSchema.pre("save", async function (next) {
  try {
    if (this.isNew && (this.iconId === undefined || this.iconId === null)) {
      const counter = await Counter.findOneAndUpdate(
        { name: "iconId" },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );
      this.iconId = counter.seq;
    }
    next();
  } catch (error) {
    next(error);
  }
});

const Icon = mongoose.model("Icon", iconSchema);

module.exports = Icon;
