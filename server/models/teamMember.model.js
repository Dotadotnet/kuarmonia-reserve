const mongoose = require("mongoose");
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema.Types;
const baseSchema = require("./baseSchema.model");
const Counter = require("./counter");

// Shared validation messages for fullName
const fullNameRequiredMessage = "نام و نام خانوادگی الزامی است";
const fullNameMinLengthMessage = "نام و نام خانوادگی باید حداقل ۳ کاراکتر باشد";
const fullNameMaxLengthMessage = "نام و نام خانوادگی باید حداکثر ۱۰۰ کاراکتر باشد";

// Shared validation messages for position
const positionRequiredMessage = "سمت عضو تیم الزامی است";
const positionMinLengthMessage = "سمت عضو تیم باید حداقل ۳ کاراکتر باشد";
const positionMaxLengthMessage = "سمت عضو تیم باید حداکثر ۵۰ کاراکتر باشد";

// Shared validation messages for description
const descRequiredMessage = "توضیحات الزامی است";
const descMinLengthMessage = "توضیحات باید حداقل ۱۰ کاراکتر باشد";
const descMaxLengthMessage = "توضیحات باید حداکثر ۵۰۰ کاراکتر باشد";

const teamMemberSchema = new Schema({
  fullName: {
    fa: { 
      type: String, 
      required: [true, fullNameRequiredMessage],
      minlength: [3, fullNameMinLengthMessage],
      maxlength: [100, fullNameMaxLengthMessage]
    },
    en: { 
      type: String, 
      required: [true, fullNameRequiredMessage],
      minlength: [3, fullNameMinLengthMessage],
      maxlength: [100, fullNameMaxLengthMessage]
    },
    tr: { 
      type: String, 
      required: [true, fullNameRequiredMessage],
      minlength: [3, fullNameMinLengthMessage],
      maxlength: [100, fullNameMaxLengthMessage]
    }
  },
  avatar: {
    url: {
      type: String,
      required: [true, "آدرس تصویر الزامی است"],
      default: "https://placehold.co/300x300.png"
    },
    public_id: {
      type: String,
      required: [true, "شناسه تصویر الزامی است"],
      default: "N/A"
    }
  },
  memberId: {
    type: Number,
    unique: true
  },
  position: {
    fa: { 
      type: String, 
      required: [true, positionRequiredMessage],
      minlength: [3, positionMinLengthMessage],
      maxlength: [50, positionMaxLengthMessage]
    },
    en: { 
      type: String, 
      required: [true, positionRequiredMessage],
      minlength: [3, positionMinLengthMessage],
      maxlength: [50, positionMaxLengthMessage]
    },
    tr: { 
      type: String, 
      required: [true, positionRequiredMessage],
      minlength: [3, positionMinLengthMessage],
      maxlength: [50, positionMaxLengthMessage]
    }
  },
  description: {
    fa: { 
      type: String, 
      required: [true, descRequiredMessage],
      minlength: [10, descMinLengthMessage],
      maxlength: [500, descMaxLengthMessage]
    },
    en: { 
      type: String, 
      required: [true, descRequiredMessage],
      minlength: [10, descMinLengthMessage],
      maxlength: [500, descMaxLengthMessage]
    },
    tr: { 
      type: String, 
      required: [true, descRequiredMessage],
      minlength: [10, descMinLengthMessage],
      maxlength: [500, descMaxLengthMessage]
    }
  },

  socialLinks: [
    {
      link: {
        type: String,
        required: [true, "آدرس شبکه اجتماعی الزامی است"]
      },
      network: {
        type: Schema.Types.ObjectId,
        ref: "SocialLink",
        required: [true, "نوع شبکه اجتماعی الزامی است"]
      }
    }
  ],
  nationalCode: {
    type: String,
    required: false,
    unique: true,
    sparse: true
  },
  phoneNumber: {
    type: String,
    required: false
  },


  isBoardMemberOrShareholder: {
    type: Boolean,
    default: false,
    description: "آیا عضو هیئت مدیره یا سهام‌دار است؟"
  },

  isOfficiallyEmployed: {
    type: Boolean,
    default: false,
    description: "آیا استخدام رسمی دارد؟"
  },
  email: {
    type: String,
    required: false,
    unique: true,
    sparse: true
  },
  hireDate: {
    type: Date,
    required: false
  },
  birthday: {
    type: Date,
    required: false
  },

  creator: {
    type: Schema.Types.ObjectId,
    ref: "Admin",
    required: [true, "شناسه ایجاد کننده الزامی است"]
  },
  ...baseSchema.obj
});

teamMemberSchema.pre("save", async function (next) {
  try {
    if (this.isNew) {
      const counter = await Counter.findOneAndUpdate(
        { name: "teamMemberId" },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );
      this.memberId = counter.seq;
    }

    next();
  } catch (error) {
    next(error);
  }
});

const TeamMember = mongoose.model("TeamMember", teamMemberSchema);
module.exports = TeamMember;