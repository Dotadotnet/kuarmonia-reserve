/* external imports */
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const baseSchema = require("./baseSchema.model");
const Counter = require("./counter")

const gallerySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "عنوان گالری الزامی است"],
      trim: true,
      maxLength: [70, "عنوان گالری نباید بیشتر از 70 کاراکتر باشد"],
    },
    description: {
      type: String,
      trim: true,
      maxLength: [300, "توضیحات تگ نباید بیشتر از 300 کاراکتر باشد"],
    },

       creator: {
      type: ObjectId,
      ref: "Admin",
      required: [true, "شناسه نویسنده الزامی است"],
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
            default: "https://placehold.co/296x200.png",
        
          },
          public_id: {
            type: String,
            default: "N/A",
          },
        },
      ],
    },    
       galleryId: {
      type: Number,
    },
    ...baseSchema.obj
  },
  { timestamps: true }
);


gallerySchema.pre('save', async function(next) {
  
  try {
    const counter = await Counter.findOneAndUpdate(
      { name: "galleryId" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    this.galleryId = counter.seq;
    next();
  } catch (error) {
    next(error);
  }
});

const Gallery = mongoose.model("Gallery", gallerySchema);

module.exports = Gallery;

