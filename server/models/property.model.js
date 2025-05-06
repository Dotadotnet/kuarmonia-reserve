const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const Counter = require("./counter");
const baseSchema = require("./baseSchema.model");
const { Schema } = mongoose;
const {
  encodeBase62
} = require("../utils/translationUtils");

const propertySchema = new Schema(
  {
    propertyId: {
      type: Number,
      unique: true,
    },
   
   translations: [
        {
          translation: {
            type: ObjectId,
            ref: "Translation",
            required: true
          },
          language: {
            type: String,
            enum: ["fa", "en", "tr"],
            required: true
          }
        }
      ],
    saleType: {
      required: [true, "لطفاً نوع فروش ملک را وارد کنید"],
      type: ObjectId,
      ref: "SaleType"
    },
    socialLinks: [
      {
        link: {
          type: String,
        },
        network: {
          type: ObjectId,
          ref: "SocialLink",
        }
      }
    ],
    tradeType: {
      required: [true, "لطفاً نوع معامله ملک را وارد کنید"],
      type: ObjectId,
      ref: "TradeType"
    },
    createDate: {
      type: Number,
      required: true,
      min: 0,
      max: 100 // به دلخواه
    },    
    type: {
      required: [true, "لطفاً نوع  ملک را وارد کنید"],
      type: ObjectId,
      ref: "PropertyType"
    },
    type: {
      required: [true, "لطفاً نوع  ملک را وارد کنید"],
      type: ObjectId,
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

    address: [{ type: ObjectId, ref: "Address" }],
    ourEventSpaces: [{ type: ObjectId, ref: "EventSpace" }],
    amenities: [
      {
        type: ObjectId,
        ref: "Amenity",
        required: true
      }
    ],    
    citizenshipStatus: {
      type: String,
      enum: ["goldenVisa", "residency", "citizenship"]
    },
    variants: {
      type: [
        {
          type: {
            type: String,
            enum: [
              "deposit",
              "monthlyRent",
              "totalPrice",
              "installmentAmount",
              "installments",
              "propertyValue",
            ],
            required: true
          },
          value: {
            type: Number,
            required: true
          }
        }
      ],
      required: true,
      validate: [v => Array.isArray(v) && v.length > 0, 'حداقل یک مورد در variants باید وجود داشته باشد']
    }
,    
    currency: {
      type: ObjectId,
      ref: "Currency"
    },
    
    location: {
      type: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true }
      },
      required: [true, "مکان ملک الزامی است"]
    },
    category: {
      type: ObjectId,
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
        type: ObjectId,
        ref: "Tag",
        required: [true, "تگ ملک الزامی است"]
      }
    ],
    shortUrl: {
      type: String,
      unique: true
    },
    
    availability: {
      type: String,
      enum: ["active", "inactive"],
      default: "active"
    },
    creator: {
      type: ObjectId,
      ref: "Admin",
      required: [true, "شناسه نویسنده الزامی است"]
    },
    bookmarkedBy: [
      {
        type: ObjectId,
        ref: "User"
      }
    ],
    likes: [
      {
        type: ObjectId,
        ref: "like"
      }
    ],
    dislikes: [
      {
        type: ObjectId,
        ref: "like"
      }
    ],
    reviews: [
      {
        type: ObjectId,
        ref: "Review"
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
  
  if (!this.propertyId) {
    const counter = await Counter.findOneAndUpdate(
      { name: "propertyId" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    this.propertyId = counter.seq;

    const base62Code = encodeBase62(this.propertyId);
    this.shortUrl = `${defaultDomain}/n/${base62Code}`;
  }


  next();
});

const Property = mongoose.model("Property", propertySchema);

module.exports = Property;
