const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const Counter = require("./counter");
const baseSchema = require("./baseSchema.model");

// Shared validation messages for title
const titleRequiredMessage = "عنوان فارسی الزامی است";
const titleMinLengthMessage = "عنوان فارسی باید حداقل ۳ کاراکتر باشد";
const titleMaxLengthMessage = "عنوان فارسی باید حداکثر ۱۰۰ کاراکتر باشد";

// Shared validation messages for subtitle
const subtitleRequiredMessage = "زیرعنوان فارسی الزامی است";
const subtitleMinLengthMessage = "زیرعنوان فارسی باید حداقل ۳ کاراکتر باشد";
const subtitleMaxLengthMessage = "زیرعنوان فارسی باید حداکثر ۱۰۰ کاراکتر باشد";

// Shared validation messages for description
const descRequiredMessage = "توضیحات فارسی الزامی است";
const descMinLengthMessage = "توضیحات فارسی باید حداقل ۱۰ کاراکتر باشد";
const descMaxLengthMessage = "توضیحات فارسی باید حداکثر ۵۰۰ کاراکتر باشد";

const heroSliderSchema = new mongoose.Schema(
  {
    heroSliderId: { type: Number, unique: true },


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

    // Direct translation fields for subtitle with validation
    subtitle: {
      fa: { 
        type: String, 
        required: [true, subtitleRequiredMessage],
        minlength: [3, subtitleMinLengthMessage],
        maxlength: [100, subtitleMaxLengthMessage]
      },
      en: { 
        type: String, 
        required: [true, subtitleRequiredMessage],
        minlength: [3, subtitleMinLengthMessage],
        maxlength: [100, subtitleMaxLengthMessage]
      },
      tr: { 
        type: String, 
        required: [true, subtitleRequiredMessage],
        minlength: [3, subtitleMinLengthMessage],
        maxlength: [100, subtitleMaxLengthMessage]
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

    desktopMedia: {
      url: { type: String, default: "https://placehold.co/1200x600.png" },
      type: { type: String, enum: ["image"], default: "image" },
      public_id: { type: String, default: "N/A" }
    },

    mobileMedia: {
      url: { type: String, default: "https://placehold.co/600x800.png" },
      type: { type: String, enum: ["image"], default: "image" },
      public_id: { type: String, default: "N/A" }
    },

    link: {
      type: String,
      required: false,
      nullable: true,
      default: null,
      trim: true
    },

    creator: { type: ObjectId, ref: "Admin" },

    ...baseSchema.obj
  },
  { 
    timestamps: true,
    strict: true  // Enable strict mode to prevent adding undefined fields
  }
);

heroSliderSchema.pre("save", async function (next) {
  try {
    // Generate heroSliderId if this is a new heroSlider
    if (this.isNew && !this.heroSliderId) {
      const counter = await Counter.findOneAndUpdate(
        { name: "heroSliderId" },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );
      this.heroSliderId = counter.seq;
    }
    
    next();
  } catch (error) {
    console.error(
      "Error setting heroSliderId:",
      error
    );
    next(error);
  }
});

module.exports = mongoose.model("HeroSlider", heroSliderSchema);