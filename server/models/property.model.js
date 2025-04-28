const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const Counter = require("./counter");
const Category = require("./category.model");
const baseSchema = require("./baseSchema.model");
const { Schema } = mongoose;
const {
  generateSlug,
  generateSeoFields,
  encodeBase62
} = require("../utils/translationUtils");

const propertySchema = new Schema(
  {
    propertyId: {
      type: String,
      required: true,
      unique: true,
      default: () => `property_${new Date().getTime()}`
    },
    title: {
      type: String,
      required: [true, "لطفاً عنوان ملک را وارد کنید"],
      trim: true,
      maxLength: [50, "عنوان نمی‌تواند بیشتر از ۵۰ کاراکتر باشد"]
    },
    slug: {
      type: String,
      unique: true
    },
   translations: [
        {
          translationId: {
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
    saleType: {
      required: [true, "لطفاً نوع فروش ملک را وارد کنید"],
      type: Schema.Types.ObjectId,
      ref: "SaleType"
    },
    socialLinks: [
      {
        link: {
          type: String,
          required: [true, "آدرس شبکه اجتماعی الزامی است"]
        },
        network: {
          type: ObjectId,
          ref: "SocialLink",
          required: [true, "نوع شبکه اجتماعی الزامی است"]
        }
      }
    ],
    tradeType: {
      required: [true, "لطفاً نوع معامله ملک را وارد کنید"],
      type: Schema.Types.ObjectId,
      ref: "TradeType"
    },

    type: {
      required: [true, "لطفاً نوع  ملک را وارد کنید"],
      type: Schema.Types.ObjectId,
      ref: "PropertyType"
    },
    unit: {
      floor: Number,
      bedrooms: Number,
      bathrooms: Number,
      square: Number,
    },
    building: {
      totalFloors: Number,
      totalUnits: Number,
      bedrooms: [Number],
      square: [Number]
    },
        summary: {
      type: String,
      maxLength: [160, "توضیحات نمی‌تواند بیشتر از ۱۶۰ کاراکتر باشد"]
    },
    description: {
      type: String,
      required: [true, "لطفاً توضیحات ملک را وارد کنید"],
      trim: true
    },
    address: [{ type: ObjectId, ref: "Address" }],
    ourEventSpaces: [
      {
        name: { type: String },
        intro: { type: String },
        description: { type: String },
        squareFootage: { type: String },
        spaces: [
          {
            public_id: { type: String, required: true },
            alt: String,
            caption: String
          }
        ]
      }
    ],
    citizenshipStatus: {
      type: String,
      enum: ["goldenVisa", "residency", "citizenship"]
    },
    variants: [
      {
        type: {
          type: String,
          enum: [
            "deposit",
            "monthlyRent",
            "totalPrice",
            "installmentAmount",
            "installments"
          ],
          required: true
        },
        value: {
          type: Number,
          required: true
        }
      }
    ],
    currency: {
      type: ObjectId,
      ref: "Currency"
    },
    amenities: [
      {
        title: {
          type: String,
          required: [true, " امکانات الزامی است"],
          maxLength: [100, " امکانات نمی‌تواند بیشتر از ۱۰۰ کاراکتر باشد"]
        },
        hasAmenity: {
          type: Boolean,
          default: false
        }
      }
    ],
    location: {
      type: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true }
      },
      required: [true, "مکان ملک الزامی است"]
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "دسته‌بندی پست الزامی است"]
    },
    thumbnail: {
      url: {
        type: String,
        required: [true, "لطفاً لینک تصویر بندانگشتی را وارد کنید"],
        default: "https://placehold.co/296x200.png"
      },
      public_id: {
        type: String,
        default: "N/A"
      }
    },
    gallery: [
      {
        url: {
          type: String,
          default: "https://placehold.co/296x200.png"
        },
        public_id: {
          type: String,
          default: "N/A"
        }
      }
    ],
  

    isFeatured: {
      type: Boolean,
      default: false
    },

    tags: [
      {
        type: Schema.Types.ObjectId,
        ref: "Tag",
        required: [true, "تگ ملک الزامی است"]
      }
    ],

    metaTitle: {
      type: String,
      maxLength: [60, "متا تایتل نمی‌تواند بیشتر از ۶۰ کاراکتر باشد"],
      default: ""
    },
    metaDescription: {
      type: String,
      maxLength: [160, "متا توضیحات نمی‌تواند بیشتر از ۱۶۰ کاراکتر باشد"],
      default: ""
    },
    metaKeywords: {
      type: [String],
      default: []
    },
    metaRobots: {
      type: String,
      default: "index, follow"
    },
    canonicalUrl: {
      type: String,
      trim: true,
      validate: {
        validator: function (v) {
          return /^(https?:\/\/[^\s$.?#].[^\s]*)$/.test(v);
        },
        message: "URL معتبر نیست"
      }
    },
    availability: {
      type: String,
      enum: ["active", "inactive"],
      default: "active"
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: "Admin",
      required: [true, "شناسه نویسنده الزامی است"]
    },
    bookmarkedBy: [
      {
        type: Schema.Types.ObjectId,
        ref: "User"
      }
    ],
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "like"
      }
    ],
    dislikes: [
      {
        type: Schema.Types.ObjectId,
        ref: "like"
      }
    ],
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: "Review"
      }
    ],

    features: [
      {
        title: {
          type: String,
          required: [true, "لطفاً عنوان ویژگی را وارد کنید"],
          maxLength: [100, "عنوان ویژگی نمی‌تواند بیشتر از ۱۰۰ کاراکتر باشد"]
        },
        content: {
          type: [String],
          required: [true, "لطفاً محتوای ویژگی را وارد کنید"],
          maxLength: [200, "محتوا نمی‌تواند بیشتر از ۲۰۰ کاراکتر باشد"]
        }
      }
    ],
    views: {
      type: Number,
      default: 0,
      min: [0, "تعداد بازدید نمی‌تواند منفی باشد"]
    },
    ...baseSchema.obj
  },
  { timestamps: true }
);
const defaultDomain = process.env.API;

propertySchema.pre("save", async function (next) {
  if (this.isModified("title")) {
    this.slug = await generateSlug(this.title);
  }

  if (!this.metaTitle || !this.metaDescription) {
    const category = await Category.findById(this.type);
    const seo = generateSeoFields({
      title: this.title,
      summary: this.summary,
      categoryTitle: category?.title || "عمومی"
    });

    if (!this.metaTitle) this.metaTitle = seo.metaTitle;
    if (!this.metaDescription) this.metaDescription = seo.metaDescription;
  }

  if (!this.propertyId) {
    const counter = await Counter.findOneAndUpdate(
      { name: "propertyId" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    this.propertyId = counter.seq;

    const base62Code = encodeBase62(this.propertyId);
    this.shortUrl = `${defaultDomain}/s/${base62Code}`;
  }

  if (!this.canonicalUrl) {
    this.canonicalUrl = `${defaultDomain}/news/${this.slug}`;
  }

  next();
});

const Property = mongoose.model("Property", propertySchema);

module.exports = Property;
