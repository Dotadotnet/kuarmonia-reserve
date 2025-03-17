/* واردات خارجی */
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const baseSchema = require("./baseSchema.model");
const Counter = require("./counter")
const Category = require("./category.model");
const Tag = require("./tag.model");

const productSchema = new mongoose.Schema(
  {
    productId: {
      type: Number,
      unique: true,
    },
    title: {
      type: String,
      required: [true, "لطفاً عنوان محصول را وارد کنید"],
      trim: true,
      unique: [true, "محصول مشابه قبلاً ثبت شده است"],
      maxLength: [100, "عنوان نمی‌تواند بیشتر از ۱۰۰ کاراکتر باشد"],
    },
    slug: {
      type: String,
      unique: true,
      required: false,
      default: function() {
        return this.title.toString()
          .trim()
          .toLowerCase()
          .replace(/[\u200B-\u200D\uFEFF]/g, "")
          .replace(/[\s\ـ]+/g, "-")
          .replace(/[^\u0600-\u06FFa-z0-9\-]/g, "")
          .replace(/-+/g, "-")
          .replace(/^-+|-+$/g, "");
      },  
    },
    summary: {
      type: String,
      required: [true, "لطفاً خلاصه محصول را وارد کنید"],
      trim: true,
      minlength: [20, "خلاصه محصول باید حداقل ۲۰ کاراکتر باشد"],
      maxlength: [50, "خلاصه محصول نمی‌تواند بیشتر از 50 کاراکتر باشد"],
    },
    description: {
      type: String,
      required: [true, "لطفاً خلاصه محصول را وارد کنید"],
      trim: true,
      maxLength: [500, "خلاصه نمی‌تواند بیشتر از ۵۰۰ کاراکتر باشد"],
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

gallery: {
  type: [
    {
      url: {
        type: String,
        required: [true, "لطفاً لینک تصویر گالری را وارد کنید"],
        default: "https://placehold.co/296x200.png",
      },
      public_id: {
        type: String,
        default: "N/A",
      },
    },
  ],
  validate: {
    validator: function (value) {
      return value.length <= 10;
    },
    message: "امکان افزودن بیش از ۱۰ تصویر در گالری وجود ندارد",
  },
},
    features: [
      {
        title: {
          type: String,
          required: [true, "لطفاً عنوان ویژگی را وارد کنید"],
          maxLength: [100, "عنوان ویژگی نمی‌تواند بیشتر از ۱۰۰ کاراکتر باشد"],
        },
        content: {
          type: [String],
          required: [true, "لطفاً محتوای ویژگی را وارد کنید"],
          maxLength: [200, "محتوا نمی‌تواند بیشتر از ۲۰۰ کاراکتر باشد"],
        },
      },
    ],

    views: {
      type: Number,
      default: 0,
      min: [0, "تعداد بازدید نمی‌تواند منفی باشد"],
    },
    publishStatus: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
      required: [true, "وضعیت انتشار الزامی است"]
    },
    rejectMessage: {
      type: String,
      required: function() {
        return this.publishStatus === "rejected";
      },
      message: "لطفاً دلیل رد شدن را وارد کنید"
    },
    variations: [
      {
        type: ObjectId,
        ref: "Variation",
      },
    ],

    campaign: {
      title: {
        type: String,
      },
      state: {
        type: String,
        enum: ["new-arrival", "discount", "sold-out", "on-sale"],
      },
    },

    
    discountAmount: {
      type: Number,
      default: 0,
    },

    stockStatus: {
      type: String,
      enum: ["in-stock", "out-of-stock", "low-stock"],
      default: "in-stock",
    },

   
    category: {
      type: ObjectId,
      ref: "Category",
    },
    qrCode: {
      type: String,
      required: false, 
    },
    
    reviews: [
      {
        type: ObjectId,
        ref: "Review",
      },
    ],
    isFeatured: {
      type: Boolean,
      default: false,
    },
    creator: {
      type: ObjectId,
      ref: "Admin",
    },
    scans: [
      {
        user: {
          type: ObjectId,
          ref: "User",
        },
        role: {
          type: String,
          enum: ["admin", "superAdmin", "buyyer"],
          default: "unknown",
        },
        scannedAt: {
          type: Date,
          default: Date.now,
        },
        userAgent: String, // اطلاعات دستگاه اسکن‌کننده
      }
    ],
    tags: [
      {
        type: ObjectId,
        ref: "Tag",
        required: [true, "تگ محصول الزامی است"],
      },
    ],
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
    ...baseSchema.obj,
  },
  { timestamps: true }
);
const defaultDomain = process.env.NEXT_PUBLIC_CLIENT_URL;

productSchema.pre("save", async function (next) {
  if (!this.isNew || this.productId) {
    return next();
  }
  try {
    // تولید productId
    const counter = await Counter.findOneAndUpdate(
      { name: "productId" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    this.productId = counter.seq;

    const productUrl = `${defaultDomain}/product?product_id=${this._id}&product_title=${this.title
      .replace(/ /g, "-")
      .toLowerCase()}`;
    this.qrCode = productUrl;

    next();
  } catch (error) {
    console.error("خطا در تولید QR Code:", error);
    next(error);
  }

  try {
    const counter = await Counter.findOneAndUpdate(
      { name: "productId" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    this.productId = counter.seq;

   
    if (
      this.isModified("title") ||
      !this.metaTitle ||
      !this.metaDescription ||
      this.metaKeywords.length === 0
    ) {
      try {
        const category = await Category.findById(this.category);
        if (category && category.title) {
          this.metaTitle = `${this.title} | ${category.title}`.substring(0, 60);
          this.metaDescription = `${this.summary} | ${category.title}`.substring(0, 160);
        } else {
          this.metaTitle = this.metaTitle || this.title.substring(0, 60);
          this.metaDescription = this.metaDescription || this.summary.substring(0, 160);
        }
        
        if (!this.metaKeywords || this.metaKeywords.length === 0) {
          const tags = await Tag.find({ _id: { $in: this.tags } }).select("title");
          this.metaKeywords = tags.length > 0 ? tags.map(tag => tag.title).slice(0, 10) : ["محصول جدید"];
        }
        
      } catch (error) {
        console.error("خطا در تنظیم metaTitle، metaDescription و metaKeywords:", error);
      }
    }

    next();
  } catch (error) {
    console.error("خطا در تنظیم مقدار محصول:", error);
    next(error);
  }
});


const Product = mongoose.model("Product", productSchema);

module.exports = Product;