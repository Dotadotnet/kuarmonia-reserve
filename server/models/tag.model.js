/* external imports */
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const baseSchema = require("./baseSchema.model");
const Counter = require("./counter");

const tagSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "عنوان تگ الزامی است"],
      trim: true,
      unique: [true, "تگ مشابه از قبل وجود دارد"],
      maxLength: [70, "عنوان تگ نباید بیشتر از 70 کاراکتر باشد"]
    },
    translations: [
      {
        translation: {
          type: mongoose.Schema.Types.ObjectId,
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

    creator: {
      type: ObjectId,
      ref: "Admin",
      required: [true, "شناسه نویسنده الزامی است"]
    },

    robots: {
      type: [
        {
          id: Number,
          value: String
        }
      ],
      default: [
        { id: 1, value: "index" },
        { id: 2, value: "follow" }
      ]
    },
    tagId: {
      type: Number
    },
    ...baseSchema.obj
  },
  { timestamps: true }
);

tagSchema.pre("save", async function (next) {
  try {
    const counter = await Counter.findOneAndUpdate(
      { name: "tagId" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    this.tagId = counter.seq;
    next();
  } catch (error) {
    next(error);
  }
});

const Tag = mongoose.model("Tag", tagSchema);

module.exports = Tag;
