/* واردات خارجی */
const mongoose = require("mongoose");
const validator = require("validator");
const { ObjectId } = mongoose.Schema.Types;
const Counter = require("./counter")
const baseSchema = require("./baseSchema.model");
/* ایجاد اسکیمای دسته‌بندی */
const categorySchema = new mongoose.Schema(
  {
    categoryId: {
      type: Number,
      unique: true,
    },
    title: {
      type: String,
      required: [true, "لطفاً نام دسته‌بندی را وارد کنید"],
      trim: true,
      unique: [true, "دسته‌بندی مشابه از قبل وجود دارد"],
      maxLength: [100, "عنوان شما باید حداکثر ۱۰۰ کاراکتر باشد"],
    },

    description: {
      type: String,
      required: [true, "لطفاً توضیحات دسته‌بندی را وارد کنید"],
      trim: true,
      maxLength: [500, "توضیحات شما باید حداکثر ۵۰۰ کاراکتر باشد"],
    },


  
    creator: {
      type: ObjectId,
      ref: "Admin",
    },

    ...baseSchema.obj
  },
  { timestamps: true }
);

categorySchema.pre("save", function (next) {
  let splitStr = this.title?.toLowerCase().split(" ");
  for (let i = 0; i < splitStr.length; i++) {
    splitStr[i] =
      splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  this.title = splitStr.join(" ");

  const newTags = [];
  this.tags.forEach((tag) =>
    newTags.push(tag.replace(" ", "-")?.toLowerCase())
  );
  this.tags = newTags;

  next();
});
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
