/* external imports */
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const validator = require("validator");
const baseSchema = require("./baseSchema.model");
const Counter = require("./counter")


const tagSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "عنوان تگ الزامی است"],
      trim: true,
      maxLength: [70, "عنوان تگ نباید بیشتر از 70 کاراکتر باشد"],
    },
    description: {
      type: String,
      trim: true,
      maxLength: [160, "توضیحات تگ نباید بیشتر از 160 کاراکتر باشد"],
    },
    keynotes: [
      {
        type: String,
        trim: true,
      },
    ],
    creator: {
      type: ObjectId,
      ref: "Admin",
      required: [true, "شناسه نویسنده الزامی است"],
    },
    slug: {
      type: String,
      unique: true,
      required: false,
      default: function() {
        const slug = this.title.toString()
          .trim()
          .toLowerCase()
          .replace(/[\u200B-\u200D\uFEFF]/g, "")
          .replace(/[\s\ـ]+/g, "-")
          .replace(/[^\u0600-\u06FFa-z0-9\-]/g, "")
          .replace(/-+/g, "-")
          .replace(/^-+|-+$/g, "");
    
        return slug;
      }
    },
    
    canonicalUrl: {
      type: String,
      required: false,
      trim: true,
      validate: {
        validator: function(v) {
          return /^(https?:\/\/[^\s$.?#].[^\s]*)$/.test(v);
        },
        message: "URL معتبر نیست",
      },
    },
    robots: {
      type: [
        {
          id: Number,
          value: String,
        },
      ],
      default: [
        { id: 1, value: "index" },
        { id: 2, value: "follow" },
      ],
    },
       tagId: {
      type: Number,
    },
    ...baseSchema.obj
  },
  { timestamps: true }
);

const defaultDomain = process.env.NEXT_PUBLIC_CLIENT_URL;

tagSchema.pre('save', async function(next) {
  if (!this.canonicalUrl) {
    this.canonicalUrl = `${defaultDomain}/tags/${this.slug}`;
  }
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

