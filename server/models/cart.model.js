

/* external imports */
const mongoose = require("mongoose");
const baseSchema = require("./baseSchema.model");
const Counter = require("./counter")
const { ObjectId } = mongoose.Schema.Types;

/* create cart schema */
const cartSchema = new mongoose.Schema(
  {
    cartId: {
      type: Number,
      unique: true,
    },
    // for product
    product: {
      type: ObjectId,
      ref: "Product",
    },

    // for user
    user: {
      type: ObjectId,
      ref: "User",
    },
    variation: {
      type: ObjectId,
      ref: "Variation",
      required: true,

    },
    guest: {
      type: String,
      required: function () {
        return !this.user;
      },
      default: null,
    },
    
       
    quantity: {
      type: Number,
      default: 1,
      min: [1, "حداقل مقدار باید ۱ باشد."],
    },
    

    ...baseSchema.obj
  },
  { timestamps: true }
);

cartSchema.pre("save", async function (next) {
  if (!this.isNew || this.cartId) {
    return next(); 
  }

  try {
    const counter = await Counter.findOneAndUpdate(
      { name: "cartId" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true } 
    );

    this.cartId = counter.seq; 
    next();
  } catch (error) {
    next(error);
  }
}); 
/* create cart schema */
const Cart = mongoose.model("Cart", cartSchema);

/* export cart schema */
module.exports = Cart;
