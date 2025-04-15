const mongoose = require("mongoose");
const { Schema } = mongoose;
const baseSchema = require("./baseSchema.model");
const Counter = require("./counter");

const teamMemberSchema = new Schema({
  fullName: {
    type: String,
    required: [true, "نام و نام خانوادگی الزامی است"]
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
  description: {
    type: String,
    maxLength: [300, "توضیحات نمی‌تواند بیشتر از ۳۰۰ کاراکتر باشد"],
    required: [true, "توضیحات الزامی است"],
  },
  memberId: {
    type: Number,
    unique: true
  },
  position: {
    type: String,
    required: [true, "سمت عضو تیم الزامی است"]
  },
  department: {
    type: String,
    required: false
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
  nationality: {
    type: String,
    required: false,
    description: "ملیت فرد"
  },

  activeCountry: {
    type: String,
    required: false,
    description: "کشوری که فرد در آن فعالیت می‌کند"
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
