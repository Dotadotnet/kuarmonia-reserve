const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const Counter = require("./counter");
const baseSchema = require("./baseSchema.model");
const { Schema } = mongoose;
const { encodeBase62 } = require("../utils/translationUtils");
const cron = require("node-cron");

const rentSchema = new Schema(
  {
    translations: [
      {
        translation: { type: ObjectId, ref: "Translation", required: true },
        language: { type: String, enum: ["fa", "en", "tr"], required: true }
      }
    ],
    gallery: {
      type: [
        {
          url: {
            type: String,
            required: true,
            default: "https://placehold.co/300x300.png"
          },
          public_id: {
            type: String,
            required: true,
            default: "N/A"
          }
        }
      ],
    },

    isFeatured: {
      type: Boolean,
      default: false
    },
    price: {
      type: Number,
      required: [true, "لطفاً قیمت اجاره را وارد کنید"]
    },
    members: {
      type: Number,
      required: [true, "لطفاً تعداد نفرات را وارد کنید"],
      default: 0
    },
    duration: {
      startDate: Date,
      endDate: Date
    },

    category: {
      type: ObjectId,
      ref: "Category",
      required: [true, "دسته‌بندی پست الزامی است"]
    },
    tags: [
      {
        type: ObjectId,
        ref: "Tag"
      }
    ],
    address: [{ type: ObjectId, ref: "Address" }],
    ourEventSpaces: [{ type: ObjectId, ref: "EventSpace" }],

    creator: {
      type: ObjectId,
      ref: "Admin"
    },
    users: [
      {
        type: ObjectId,
        ref: "User"
      }
    ],
    reviews: [
      {
        type: ObjectId,
        ref: "Review"
      }
    ],
    socialLinks: [
      {
        link: {
          type: String
        },
        network: {
          type: ObjectId,
          ref: "SocialLink"
        }
      }
    ],
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active"
    },
    shortUrl: {
      type: String,
      unique: true
    },
    ...baseSchema.obj
  },
  { timestamps: true }
);

rentSchema.pre("save", async function (next) {
  const currentDate = new Date();

  if (!this.shortUrl) {
    const counter = await Counter.findOneAndUpdate(
      { name: "rentId" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    const base62Code = encodeBase62(counter.seq);
    this.shortUrl = `${process.env.API}/n/${base62Code}`;
  }

  if (
    this.duration &&
    this.duration.endDate &&
    currentDate > this.duration.endDate
  ) {
    this.status = "inactive";
  }

  next();
});

cron.schedule("0 0 * * *", async () => {
  const currentDate = new Date();
  const rentsToUpdate = await Rent.find({
    "duration.endDate": { $lt: currentDate },
    status: "active"
  });

  for (const rent of rentsToUpdate) {
    rent.status = "inactive";
    await rent.save();
  }
});

const Rent = mongoose.model("Rent", rentSchema);

module.exports = Rent;
