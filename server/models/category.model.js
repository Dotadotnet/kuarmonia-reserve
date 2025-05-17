/* واردات خارجی */
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const Counter = require("./counter");
const baseSchema = require("./baseSchema.model");

const categorySchema = new mongoose.Schema(
  {
    categoryId: {
      type: Number,
      unique: true
    },
   
     translations: [
         {
          translation: {
             type: mongoose.Schema.Types.ObjectId,
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

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
