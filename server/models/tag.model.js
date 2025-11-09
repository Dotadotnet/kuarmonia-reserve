/* external imports */
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const baseSchema = require("./baseSchema.model");
const Counter = require("./counter");

const defaultDomain = process.env.NEXT_PUBLIC_CLIENT_URL;

const tagSchema = new mongoose.Schema(
  {
    title: {
      fa: { 
        type: String,
        required: [true, "عنوان تگ الزامی است"],
        trim: true,
        maxLength: [70, "عنوان تگ نباید بیشتر از 70 کاراکتر باشد"],
      unique: true
      },
      en: { 
        type: String,
        required: [true, "عنوان تگ الزامی است"],
        trim: true,
        maxLength: [70, "عنوان تگ نباید بیشتر از 70 کاراکتر باشد"]
      },
      tr: { 
        type: String,
        required: [true, "عنوان تگ الزامی است"],
        trim: true,
        maxLength: [70, "عنوان تگ نباید بیشتر از 70 کاراکتر باشد"]
      }
    },

    description: {
      fa: { 
        type: String,
        trim: true,
        maxLength: [1000, "توضیحات تگ نباید بیشتر از 1000 کاراکتر باشد"]
      },
      en: { 
        type: String,
        trim: true,
        maxLength: [1000, "توضیحات تگ نباید بیشتر از 1000 کاراکتر باشد"]
      },
      tr: { 
        type: String,
        trim: true,
        maxLength: [1000, "توضیحات تگ نباید بیشتر از 1000 کاراکتر باشد"]
      }
    },

    keynotes: {
      fa: [{ 
        type: String,
        trim: true,
        maxLength: [100, "کلمه کلیدی نباید بیشتر از 100 کاراکتر باشد"]
      }],
      en: [{ 
        type: String,
        trim: true,
        maxLength: [100, "کلمه کلیدی نباید بیشتر از 100 کاراکتر باشد"]
      }],
      tr: [{ 
        type: String,
        trim: true,
        maxLength: [100, "کلمه کلیدی نباید بیشتر از 100 کاراکتر باشد"]
      }]
    },

    slug: {
      type: String,
      trim: true,
      maxLength: [100, "اسلاگ تگ نباید بیشتر از 100 کاراکتر باشد"]
    },

    canonicalUrl: {
      type: String,
      trim: true
    },

    creator: {
      type: ObjectId,
      ref: "Admin",
      required: [true, "شناسه نویسنده الزامی است"]
    },

    // Add thumbnail field similar to category model
    thumbnail: {
      url: {
        type: String,
        default: "https://placehold.co/300x300.png"
      },
      public_id: {
        type: String,
        default: "N/A"
      }
    },

    tagId: {
      type: Number
    },
    ...baseSchema.obj
  },
  { timestamps: true }
);

tagSchema.pre("save", async function (next) {
  if (!this.isNew || this.tagId) {
    return next();
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

// Generate slug and canonicalUrl before saving the document
tagSchema.pre("save", async function (next) {
  try {
    // Generate slug from English title if it doesn't exist or has changed
    if (this.isNew || this.isModified("title")) {
      if (this.title && this.title.en) {
        const { generateSlug } = require("../utils/seoUtils");
        this.slug = await generateSlug(this.title.en);
      }
    }
    
    // Set a flag to generate the canonicalUrl after save
    if ((this.isNew || this.isModified("slug")) && this.slug) {
      this._generateCanonicalUrl = true;
    }
    
    next();
  } catch (error) {
    next(error);
  }
});

// Generate canonicalUrl after saving the document
tagSchema.post("save", async function (doc) {
  try {
    // Generate canonicalUrl with _id at the end
    if (this._generateCanonicalUrl && this.slug && this._id) {
      this.canonicalUrl = `${defaultDomain}/tag/${this.slug}/${this._id}`;
      // Use updateOne to avoid triggering the save hooks again
      await this.updateOne({ canonicalUrl: this.canonicalUrl });
    }
  } catch (error) {
    console.error("Error generating canonicalUrl:", error);
  }
});

const Tag = mongoose.model("Tag", tagSchema);

module.exports = Tag;