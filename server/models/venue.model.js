/* واردات خارجی */
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const Counter = require("./counter");
const baseSchema = require("./baseSchema.model");

/* ایجاد اسکیمای مکان برگزاری */
const venueSchema = new mongoose.Schema(
  {
    venueId: {
      type: Number,
      unique: true
    },
    name: {
      type: String,
      required: [true, "نام مکان الزامی است"],
      unique: true,
      trim: true,
      minLength: [3, "نام مکان باید حداقل ۳ کاراکتر باشد"],
      maxLength: [50, "نام مکان نمی‌تواند بیشتر از ۵۰ کاراکتر باشد"]
    },
    slug: {
      type: String,
      unique: true,
      default: function () {
        return this.name
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
    capacity: {
      minCapacity: {
        type: Number,
        required: true,
        min: 10
      },
      maxCapacity: {
        type: Number,
        required: true,
        max: 500
      }
    },

    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true
    },
    category: {
      type: ObjectId,
      ref: "Category",
    },
    currency: {
      type: ObjectId,
      ref: "Currency",
    },
    summary: {
      type: String,
      maxLength: [60, "توضیحات نمی‌تواند بیشتر از ۶۰ کاراکتر باشد"]
    },
    about: {
      type: String,
      maxLength: [600, "توضیحات نمی‌تواند بیشتر از ۶۰۰ کاراکتر باشد"]
    },
    creator: {
      type: ObjectId,
      ref: "Admin",
      required: [true, "شناسه نویسنده الزامی است"]
    },
    isReception: {
      type: Boolean,
      default: true
    },
    guestCapacity: {
      minCapacity: {
        type: Number,
        required: [true, "حداقل ظرفیت مهمان الزامی است"],
        min: [1, "حداقل ظرفیت باید حداقل ۱ نفر باشد"]
      },
      maxCapacity: {
        type: Number,
        required: [true, "حداکثر ظرفیت مهمان الزامی است"],
        min: [1, "حداکثر ظرفیت باید حداقل ۱ نفر باشد"],
        validate: {
          validator: function (value) {
            return value >= this.minCapacity;
          },
          message: "حداکثر ظرفیت باید بیشتر از حداقل ظرفیت باشد"
        }
      }
    },
    features: [
      {
        name: { type: String, required: true },
        description: { type: String }
      }
    ],
    tags: [{ type: ObjectId, ref: "Tags" }],
    servicesVenue: [{ type: ObjectId, ref: "ServiceVenue" }],
    settingVenue: [{ type: ObjectId, ref: "SettingVenue" }],
    awards: [{ type: ObjectId, ref: "VenueAward" }],
    events: [{ type: ObjectId, ref: "VenueEvent" }],
    amenities: [{ type: ObjectId, ref: "AmenityVenue" }],
    priceDetails: [{ type: ObjectId, ref: "PriceDetail" }],
    CeremonyTypes: [{ type: ObjectId, ref: "CeremonyType" }],
    likes: [{ type: ObjectId, ref: "Like" }],
    disLikes: [{ type: ObjectId, ref: "Like" }],
    address: [{ type: ObjectId, ref: "Address" }],
    venueVendors: [{ type: ObjectId, ref: "VenueVendors" }],
    view: [{ type: ObjectId, ref: "View" }],
    ourEventSpaces: [
      {
        name: { type: String },
        intro: { type: String },
        description: { type: String },
        seatedCapacity: { type: String },
        standingCapacity: { type: String },
        squareFootage: { type: String },
        roomCost: { type: String },
        spaces: [
          {
            public_id: { type: String, required: true },
            alt: String,
            caption: String
          }
        ],
        previewSpaces: [{ type: String }],
        isPriceIncluded: { type: Boolean, default: true }
      }
    ],

    packages: [
      {
        type: {
          type: String,
          enum: ["rental", "beverage", "catering", "venodr", "custom"]
        },
        guestRange: {
          min: Number,
          max: Number
        },
        pricing: {
          peak: {
            min: Number,
            max: Number
          },
          offPeak: {
            min: Number,
            max: Number
          }
        },
        description: String,
        includedItems: [String]
      }
    ],
    location: {
      type: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true }
      },
      required: [true, "مکان محل مراسم الزامی است"]
    },
    basePrice: {
      type: Number,
      required: [true, "قیمت پایه الزامی است"],
      min: [0, "قیمت پایه نمی‌تواند کمتر از صفر باشد"]
    },
    campaign: {
      title: {
        type: String
      },
      state: {
        type: String,
        enum: [
          "auction",
          "fixed-price",
          "negotiable",
          "limited-offer",
          "exclusive"
        ]
      }
    },
    stars: {
      type: Number,
      required: [true, "تعداد ستاره‌های هتل الزامی است"],
      min: [1, "حداقل تعداد ستاره ۱ است"],
      max: [5, "حداکثر تعداد ستاره ۵ است"]
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
    reviews: [{ type: ObjectId, ref: "Review" }],
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
    ...baseSchema.obj
  },
  { timestamps: true }
);

venueSchema.pre("save", async function (next) {
  if (!this.isNew || this.venueId) return next();
  if (this.isNew) {
    this.venueId = await getNextSequenceValue("venueId");
  }

  if (!this.canonicalUrl) {
    this.canonicalUrl = `${defaultDomain}/venue/${this.slug}`;
  }

  try {
    const counter = await Counter.findOneAndUpdate(
      { name: "venueId" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    this.venueId = counter.seq;
    next();
  } catch (error) {
    next(error);
  }
});

const Venue = mongoose.model("Venue", venueSchema);

module.exports = Venue;
