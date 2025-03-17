const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const sessionSchema = new mongoose.Schema(
  {
    sessionId: {
      type: String,
      required: true,
      unique: true
    },
    userId: {
      type: String,
      required: true
    },
    visitCount: {
      type: Number,
      default: 1
    },
    cart: [
      {
        type: ObjectId,
        ref: "Cart",
      },
    ],
    role: {
      type: String,
      default: "buyer"
    }
  },
  { timestamps: true }
);

// متد برای افزایش تعداد بازدیدها
sessionSchema.methods.incrementVisitCount = async function () {
  this.visitCount += 1;
  await this.save();
};

// جلوگیری از OverwriteModelError
module.exports = mongoose.models.Session || mongoose.model("Session", sessionSchema);
