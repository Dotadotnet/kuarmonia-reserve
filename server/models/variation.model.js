const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const variationSchema = new mongoose.Schema(
  {
    product: {
      type: ObjectId,
      ref: "Product",
      required: true,
    },
    unit: {
      type: ObjectId,
      ref: "Unit",
      required: true,
    },
    price: {
      type: Number,
      required: [true, "لطفاً قیمت را وارد کنید"],
    },
    stock: {
      type: Number,
      required: [true, "لطفاً تعداد موجود را وارد کنید"],
      default: 0,
    },
    lowStockThreshold: {
      type: Number,
      required: [true, "لطفاً حد آستانه موجودی را مشخص کنید"],
      default: 10,
    },
    stockStatus: {
      type: String,
      enum: ["in-stock", "out-of-stock", "low-stock"],
      default: "in-stock",
    },
  },
  { timestamps: true }
);

// محاسبه وضعیت موجودی قبل از ذخیره در پایگاه داده
variationSchema.pre("save", function (next) {
  if (this.stock === 0) {
    this.stockStatus = "out-of-stock";
  } else if (this.stock < this.lowStockThreshold) {
    this.stockStatus = "low-stock";
  } else {
    this.stockStatus = "in-stock";
  }
  next();
});

const Variation = mongoose.model("Variation", variationSchema);
module.exports = Variation;
