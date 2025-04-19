const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const Counter = require("./counter")
const baseSchema = require("./baseSchema.model");
const { Schema } = mongoose;


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
    saleType: {
      required: [true, "لطفاً نوع فروش ملک را وارد کنید"],
      type: Schema.Types.ObjectId,
      ref: "SaleType",
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
      ref: "TradeType",   
     },
    type: {
      required: [true, "لطفاً نوع  ملک را وارد کنید"],
      type: Schema.Types.ObjectId,
      ref: "PropertyType",
    },
    slug: {
      type: String,
      unique: true,
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
      }
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
    country: {
      type: String,
      required: [true, "لطفاً کشور را وارد کنید"],
      trim: true
    },
    state: {
      type: String,
      required: [true, "لطفاً استان را وارد کنید"],
      trim: true
    },
    city: {
      type: String,
      required: [true, "لطفاً شهر را وارد کنید"],
      trim: true
    },
    citizenshipStatus: {
      type: String,
      enum: ["goldenVisa", "residency", "citizenship"],
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
      ref: "Currency",
    },  

    location: { 
      type: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true }
      },
      required: [true, "مکان ملک الزامی است"]
    },
    square: {
      type: Number,
      required: [true, "لطفاً مساحت ملک را وارد کنید"]
    },
    bedrooms: {
      type: Number,
      default: 0
    },
    bathrooms: {
      type: Number,
      default: 0
    },

    amenities: {
      type: [String],
      default: [] 
    },    
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "دسته‌بندی پست الزامی است"],
    },
    thumbnail: {
      url: {
        type: String,
        required: [true, "لطفاً لینک تصویر بندانگشتی را وارد کنید"],
        default: "https://placehold.co/296x200.png",
      },
      public_id: {
        type: String,
        default: "N/A",
      },
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
        },
      }
    ],
    createDate: {
      type: Number
    },
    ownerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  
    updatedDate: {
      type: Date,
      default: Date.now
    },
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
    amenities: [
      {
        title: {
          type: String,
          required: [true, " امکانات الزامی است"],
          maxLength: [100, " امکانات نمی‌تواند بیشتر از ۱۰۰ کاراکتر باشد"]
        },
        hasAmenity: {
          type: Boolean,
          default: false, 
        }
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
  // تنظیمات Meta
  if (!this.metaTitle) {
    this.metaTitle =
      this.title.length > 60 ? this.title.substring(0, 60) : this.title;
  }

  if (!this.metaDescription) {
    this.metaDescription =
      this.summary?.length > 160
        ? this.summary.substring(0, 160)
        : this.summary;
  }

  if (!this.metaKeywords || this.metaKeywords.length === 0) {
    const keywords = [];
    if (this.tags?.length > 0) {
      this.tags.forEach((tag) => keywords.push(tag.name || tag)); // توجه به اینکه تگ‌ها ممکن است آبجکت باشند
    }
    keywords.push(this.type);
    this.metaKeywords = keywords.slice(0, 10);
  }


  const counter = await Counter.findOneAndUpdate(
    { name: "propertyId" },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );
  this.propertyId = counter.seq;
  if (!this.canonicalUrl) {
    this.canonicalUrl = `${defaultDomain}/propert/${this.propertyId}/${this.slug.replaceAll(" ","-")}`;
  }

  next();
});

const Property = mongoose.model("Property", propertySchema);

module.exports = Property; 


