const mongoose = require("mongoose");
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema.Types;
const baseSchema = require("./baseSchema.model");
const Counter = require("./counter");

const propertyTypeSchema = new Schema({

  typeId: {
    type: Number,
    unique: true,
  },
   translations: [
        {
          translation: {
            type: ObjectId,
            ref: "Translation",
            required: true
          },
          language: {
            type: String,
            enum: ["en", "tr", "ar"],
            required: true
          }
        }
      ],
  creator: {
    type: ObjectId,
    ref: "Admin",
    required: [true, "شناسه نویسنده الزامی است"]
  },
 
  icon: { type: String, required: false },
  ...baseSchema.obj,
});

propertyTypeSchema.pre("save", async function (next) {
  try {
    if (this.isNew) {
      const counter = await Counter.findOneAndUpdate(
        { name: "propertyTypeId" },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );
      this.typeId = counter.seq;
    }
   
   

    next();
  } catch (error) {
    next(error);
  }
});

const PropertyType = mongoose.model("PropertyType", propertyTypeSchema);
module.exports = PropertyType;
