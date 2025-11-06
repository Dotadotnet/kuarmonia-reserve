const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const Counter = require("./counter");
const baseSchema = require("./baseSchema.model");

// Shared validation messages for title
const titleRequiredMessage = "عنوان فارسی الزامی است";
const titleMinLengthMessage = "عنوان فارسی باید حداقل ۳ کاراکتر باشد";
const titleMaxLengthMessage = "عنوان فارسی باید حداکثر ۱۰۰ کاراکتر باشد";

// Shared validation messages for description
const descRequiredMessage = "توضیحات فارسی الزامی است";
const descMinLengthMessage = "توضیحات فارسی باید حداقل ۱۰ کاراکتر باشد";
const descMaxLengthMessage = "توضیحات فارسی باید حداکثر ۵۰۰ کاراکتر باشد";

const storySchema = new mongoose.Schema(
  {
    storyId: { type: Number, unique: true },
    
    // Order field to specify story position
    order: { 
      type: Number, 
      required: [true, "ترتیب استوری الزامی است"]
    },

    // Parent-child relationship
    parent: {
      type: ObjectId,
      ref: "Story",
      default: null
    },
    
    children: [
      {
        type: ObjectId,
        ref: "Story"
      }
    ],

    // Direct translation fields for title with validation
    title: {
      fa: { 
        type: String, 
        required: [true, titleRequiredMessage],
        minlength: [3, titleMinLengthMessage],
        maxlength: [100, titleMaxLengthMessage]
      },
      en: { 
        type: String, 
        required: [true, titleRequiredMessage],
        minlength: [3, titleMinLengthMessage],
        maxlength: [100, titleMaxLengthMessage]
      },
      tr: { 
        type: String, 
        required: [true, titleRequiredMessage],
        minlength: [3, titleMinLengthMessage],
        maxlength: [100, titleMaxLengthMessage]
      }
    },

    caption: {
      fa: { 
        type: String, 
        required: [true, descRequiredMessage],
        minlength: [10, descMinLengthMessage],
        maxlength: [500, descMaxLengthMessage]
      },
      en: { 
        type: String, 
        required: [true, descRequiredMessage],
        minlength: [10, descMinLengthMessage],
        maxlength: [500, descMaxLengthMessage]
      },
      tr: { 
        type: String, 
        required: [true, descRequiredMessage],
        minlength: [10, descMinLengthMessage],
        maxlength: [500, descMaxLengthMessage]
      }
    },

    media: {
      url: { type: String, default: "https://placehold.co/600x400.png" },
      type: { type: String, enum: ["image", "video"], default: "image" },
      public_id: { type: String, default: "N/A" }
    },

    creator: { type: ObjectId, ref: "Admin" },

    ...baseSchema.obj
  },
  { timestamps: true }
);

storySchema.pre("save", async function (next) {
  // Generate storyId if this is a new story
  if (this.isNew && !this.storyId) {
    try {
      const counter = await Counter.findOneAndUpdate(
        { name: "storyId" },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );
      this.storyId = counter.seq;
    } catch (err) {
      return next(err);
    }
  }
  
  // Check for duplicate order values
  if (this.isModified('order')) {
    const duplicate = await this.constructor.findOne({ 
      order: this.order, 
      _id: { $ne: this._id } 
    });
    
    if (duplicate) {
      return next(new Error('ترتیب استوری باید منحصر به فرد باشد'));
    }
  }
  
  next();
});

module.exports = mongoose.model("Story", storySchema);