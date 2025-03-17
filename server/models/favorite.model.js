

/* external imports */
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const baseSchema = require("./baseSchema.model");
const Counter = require("./counter")
/* create favorite schema */
const favoriteSchema = new mongoose.Schema(
  {
    favoriteId: {
      type: Number,
      unique: true,
    },
    // for user
    user: {
      type: ObjectId,
      ref: "User",
    },

    // for product
    product: {
      type: ObjectId,
      ref: "Product",
    },

    ...baseSchema.obj
  },
  { timestamps: true }
);

favoriteSchema.pre("save", async function (next) {
  if (!this.isNew || this.fevoriteId) {
    return next(); 
  }

  try {
    const counter = await Counter.findOneAndUpdate(
      { name: "fevoriteId" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true } 
    );

    this.fevoriteId = counter.seq; 
    next();
  } catch (error) {
    next(error);
  }
}); 
/* create favorite model */
const Favorite = mongoose.model("Favorite", favoriteSchema);

/* export favorite model */
module.exports = Favorite;
