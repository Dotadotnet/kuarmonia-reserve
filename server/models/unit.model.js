/* external imports */
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const baseSchema = require("./baseSchema.model");
const Counter = require("./counter")

const unitSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "عنوان واحد الزامی است"],
      trim: true,
      maxLength: [50, "عنوان تگ نباید بیشتر از 50 کاراکتر باشد"],
    },
    value: {
      type: Number,
      required: [true, "مقدار عددی واحد الزامی است"],
      min: [0, "مقدار نمی‌تواند منفی باشد"],
    },
    description: {
      type: String,
      trim: true,
      maxLength: [300, "توضیحات تگ نباید بیشتر از 300 کاراکتر باشد"],
    },
    category: {
      type: ObjectId,
      ref: "Category",
      required: [true, "دسته بندی  الزامی است"],
    },
       creator: {
      type: ObjectId,
      ref: "Admin",
      required: [true, "شناسه نویسنده الزامی است"],
    },    
       unitId: {
      type: Number,
    },
    ...baseSchema.obj
  },
  { timestamps: true }
);


unitSchema.pre('save', async function(next) {
  
  try {
    const counter = await Counter.findOneAndUpdate(
      { name: "unitId" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    this.unitId = counter.seq;
    next();
  } catch (error) {
    next(error);
  }
});

const Unit = mongoose.model("Unit", unitSchema);

module.exports = Unit;

