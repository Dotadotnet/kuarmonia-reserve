/* واردات خارجی */
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const Counter = require("./counter");
const baseSchema = require("./baseSchema.model");

const defaultDomain = process.env.NEXT_PUBLIC_CLIENT_URL;

const categorySchema = new mongoose.Schema(
  {
    categoryId: {
      type: Number,
      unique: true
    },
   
    title: {
      fa: { 
        type: String,
        required: [true, "عنوان دسته‌بندی الزامی است"],
        trim: true,
        maxLength: [100, "عنوان دسته‌بندی نباید بیشتر از 100 کاراکتر باشد"]
      },
      en: { 
        type: String,
        required: [true, "عنوان دسته‌بندی الزامی است"],
        trim: true,
        maxLength: [100, "عنوان دسته‌بندی نباید بیشتر از 100 کاراکتر باشد"]
      },
      tr: { 
        type: String,
        required: [true, "عنوان دسته‌بندی الزامی است"],
        trim: true,
        maxLength: [100, "عنوان دسته‌بندی نباید بیشتر از 100 کاراکتر باشد"]
      }
    },

    description: {
      fa: { 
        type: String,
        trim: true,
        maxLength: [500, "توضیحات دسته‌بندی نباید بیشتر از 500 کاراکتر باشد"]
      },
      en: { 
        type: String,
        trim: true,
        maxLength: [500, "توضیحات دسته‌بندی نباید بیشتر از 500 کاراکتر باشد"]
      },
      tr: { 
        type: String,
        trim: true,
        maxLength: [500, "توضیحات دسته‌بندی نباید بیشتر از 500 کاراکتر باشد"]
      }
    },

    slug: {
      type: String,
      trim: true,
      maxLength: [100, "اسلاگ دسته‌بندی نباید بیشتر از 100 کاراکتر باشد"]
    },

    canonicalUrl: {
      type: String,
      trim: true
    },

    icon: {
      type: String,
      required: false
    },
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
 
   
    creator: {
      type: ObjectId,
      ref: "Admin"
    },

    ...baseSchema.obj
  },
  { timestamps: true }
);

categorySchema.pre("save", async function (next) {
  if (!this.isNew || this.categoryId) {
    return next();
  }
  
  try {
    const counter = await Counter.findOneAndUpdate(
      { name: "categoryId" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    this.categoryId = counter.seq;
    next();
  } catch (error) {
    next(error);
  }
});

// Generate slug and canonicalUrl before saving the document
categorySchema.pre("save", async function (next) {
  try {
    // Generate slug from English title if it doesn't exist or has changed
    if (this.isNew || this.isModified("title")) {
      if (this.title && this.title.en) {
        const { generateSlug } = require("../utils/seoUtils");
        this.slug = await generateSlug(this.title.en);
      }
    }
    
    // Generate canonicalUrl with _id at the end
    if ((this.isNew || this.isModified("slug")) && this.slug) {
      // We need to wait until the document is saved to get the _id
      // So we'll set a flag to generate the canonicalUrl after save
      this._generateCanonicalUrl = true;
    }
    
    next();
  } catch (error) {
    next(error);
  }
});

// Generate canonicalUrl after saving the document
categorySchema.post("save", async function (doc) {
  try {
    // Generate canonicalUrl with _id at the end
    if (this._generateCanonicalUrl && this.slug && this._id) {
      this.canonicalUrl = `${defaultDomain}/category/${this.slug}/${this._id}`;
      // Use updateOne to avoid triggering the save hooks again
      await this.updateOne({ canonicalUrl: this.canonicalUrl });
    }
  } catch (error) {
    console.error("Error generating canonicalUrl:", error);
  }
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;