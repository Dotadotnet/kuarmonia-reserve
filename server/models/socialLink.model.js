/* واردات خارجی */
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const baseSchema = require("./baseSchema.model");
const Counter = require("./counter");

const socialLinkSchema = new mongoose.Schema(
  {
    socialLinkId: {
      type: Number,
      unique: true
    },
    title: {
      type: String,
      required: [true, "عنوان پلتفرم الزامی است"]
    },
    
    platform: {
      type: String,
      required: [true, "نوع پلتفرم الزامی است"]
    },

    description: {
      type: String,
      required: [true, "توضیحات پلتفرم الزامی است"]
    },

    url: {
      type: String,
      required: [true, "آدرس لینک الزامی است"],
      trim: true,
      match: [/^https?:\/\/.*$/, "آدرس واردشده باید یک لینک معتبر باشد"]
    },

    icon: {
      type: String,
      required: false
    },

    creator: {
      type: ObjectId,
      ref: "Admin"
    },

    ...baseSchema.obj
  },
  { timestamps: true }
);

socialLinkSchema.pre("save", async function (next) {
  if (!this.isNew || this.socialLinkId) {
    return next();
  }

  try {
    const counter = await Counter.findOneAndUpdate(
      { name: "socialLinkId" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    this.socialLinkId = counter.seq;
    next();
  } catch (error) {
    next(error);
  }
});

const SocialLink = mongoose.model("SocialLink", socialLinkSchema);

module.exports = SocialLink;
