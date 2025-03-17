

/* external imports */
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const baseSchema = require("./baseSchema.model");
/* create purchase schema */
const purchaseSchema = new mongoose.Schema(
  {
    purchaseId: {
      type: Number,
      unique: true,
    },
    // for customer
    customer: {
      type: ObjectId,
      ref: "User",
    },

    // for products
    products: [
      {
        product: {
          type: ObjectId,
          ref: "Product",
        },

        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],

    // for customer ID
    customerId: {
      type: String,
      required: true,
    },

    // for order ID
    orderId: {
      type: String,
      required: true,
    },

    // for total amount
    totalAmount: {
      type: Number,
      required: true,
    },

    // order status
    status: {
      type: String,
      enum: ["pending", "delivered"],
      default: "pending",
    },

    ...baseSchema.obj
  },
  { timestamps: true }
);

purchaseSchema.pre("save", async function (next) {
  if (!this.isNew || this.purchaseId) {
    return next(); 
  }

  try {
    const counter = await Counter.findOneAndUpdate(
      { name: "purchaseId" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true } 
    );

    this.purchaseId = counter.seq; 
    next();
  } catch (error) {
    next(error);
  }
}); 
/* create purchase model */
const Purchase = mongoose.model("Purchase", purchaseSchema);

/* export purchase model */
module.exports = Purchase;
