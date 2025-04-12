
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const Tag = require("./tag.model");
const PropertyType = require("./propertyType.model");
const Category = require("./category.model");
const Counter = require("./counter")
const baseSchema = require("./baseSchema.model");
const { Schema } = mongoose;


const mediaSchema = new Schema(
  {
    mediaId: {
      type: Number,
      unique: true,
    },
    title: {
      type: String,
      required: [true, "عنوان پست الزامی است"],
      trim: true,
      minLength: [3, "عنوان پست باید حداقل ۳ کاراکتر باشد"],
      maxLength: [100, "عنوان پست نمی‌تواند بیشتر از ۱۰۰ کاراکتر باشد"],
    },
    slug: {
      type: String,
      unique: true,
      required: false,
      default: function () {
        return this.title
          .toString()
          .trim()
          .toLowerCase()
          .replace(/[\u200B-\u200D\uFEFF]/g, "")
          .replace(/[\s\ـ]+/g, "-")
          .replace(/[^\u0600-\u06FFa-z0-9\-]/g, "")
          .replace(/-+/g, "-")
          .replace(/^-+|-+$/g, "");
      },
    },
    description: {
      type: String,
      maxLength: [300, "توضیحات نمی‌تواند بیشتر از ۳۰۰ کاراکتر باشد"],
      required: [true, "توضیحات الزامی است"],
    },
    tags: [
      {
        type: Schema.Types.ObjectId,
        ref: "Tag",
        required: [true, "تگ پست الزامی است"],
      },
    ],
    thumbnail: {
      url: {
        type: String,
      },
      public_id: {
        type: String,
        default: "N/A",
      },
    },
    media: {
      url: {
        type: String,
        required: [true, "رسانه الزامی است"],
      },
      type:{
        type:String,
        default:"video"
      },
      public_id: {
        type: String,
        default: "N/A",
      },
    },
    metaTitle: {
      type: String,
      maxLength: [60, "متا تایتل نمی‌تواند بیشتر از ۶۰ کاراکتر باشد"],
      default: "",
    },
    metaDescription: {
      type: String,
      maxLength: [160, "متا توضیحات نمی‌تواند بیشتر از ۱۶۰ کاراکتر باشد"],
      default: "",
    },
    metaKeywords: {
      type: [String],
      default: [],
    },
    metaRobots: {
      type: String,
      enum: ["index, follow", "noindex, nofollow", "index, nofollow", "noindex, follow"],
      default: "index, follow",
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: "Admin",
      required: [true, "شناسه نویسنده الزامی است"],
    },
    visibility: {
      type: Boolean,
      default: true,
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
    isFeatured: {
      type: Boolean,
      default: false,
    },
    lastUpdated: {
      type: Date,
      default: Date.now,
    },
     category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "دسته‌بندی پست الزامی است"],
    },
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment", 
      },
    ],
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "like", 
      },
    ],
    dislikes: [
      {
        type: Schema.Types.ObjectId,
        ref: "like",
      },
    ],
    views: {
      type: Number,
      default: 0,
      min: [0, "تعداد بازدید نمی‌تواند منفی باشد"],
    },
    ...baseSchema.obj,
  },
  { timestamps: true }
);

mediaSchema.virtual('likeCount').get(function() {
  return this.likes ? this.likes.length : 0;
});

mediaSchema.virtual('dislikeCount').get(function() {
  return this.dislikes ? this.dislikes.length : 0;
});

mediaSchema.virtual('rating').get(function() {
  const totalReactions = this.likes.length + this.dislikes.length;
  if (totalReactions === 0) return 0;

  const likeRatio = this.likes.length / totalReactions;
  return Math.round((likeRatio * 5 + Number.EPSILON) * 100) / 100; 
});

const defaultDomain = process.env.NEXT_PUBLIC_BASE_URL;

mediaSchema.pre('save', async function(next) {
  if (this.isNew) {
    this.mediaId = await getNextSequenceValue('mediaId');
  }
  if (!this.canonicalUrl) {
    this.canonicalUrl = `${defaultDomain}/media/${this.slug}/${encodeURIComponent(this._id)}`;
  }
  next();
});

mediaSchema.set('toJSON', { virtuals: true });
mediaSchema.set('toObject', { virtuals: true });

mediaSchema.pre("save", async function (next) {
  if (this.isNew) {
    this.mediaId = await getNextSequenceValue("mediaId");
  }

  if (this.isNew || this.isModified("visibility")) {
    this.metaRobots = this.visibility === "private" ? "noindex, nofollow" : "index, follow";
  }

  if (
    this.isModified("title") ||
    this.isModified("category") ||
    this.metaTitle === "" ||
    this.metaDescription === "" ||
    this.metaKeywords.length === 0
  ) {
    try {
      const category = await Category.findById(this.category);
      if (category) {
        let combinedMetaTitle = `${this.title} | ${category.title}`;
        if (combinedMetaTitle.length > 60) {
          const excessLength = combinedMetaTitle.length - 60;
          combinedMetaTitle = `${this.title.substring(0, this.title.length - excessLength)} | ${category.title}`;
        }
        this.metaTitle = combinedMetaTitle;

        let combinedMetaDescription = `${this.description} | ${category.title}`;
        if (combinedMetaDescription.length > 160) {
          const excessLength = combinedMetaDescription.length - 160;
          combinedMetaDescription = `${this.description.substring(0, this.description.length - excessLength)} | ${category.title}`;
        }
        this.metaDescription = combinedMetaDescription;

        const tags = await Tag.find({ _id: { $in: this.tags } });
        const tagKeywords = tags.map(tag => tag.title);
        this.metaKeywords = tagKeywords.slice(0, 10);
      } else {
        this.metaTitle = this.title.length > 60 ? this.title.substring(0, 57) + "..." : this.title;
        this.metaDescription = this.description.length > 160 ? this.description.substring(0, 157) + "..." : this.description;
        this.metaKeywords = this.metaKeywords.length > 0 ? this.metaKeywords.slice(0, 10) : [];
      }
    } catch (error) {
      console.error("خطا در تنظیم metaTitle، metaDescription و metaKeywords:", error);
    }
  }

  next();
});



const Media = mongoose.model("Media", mediaSchema);

module.exports = Media; 
