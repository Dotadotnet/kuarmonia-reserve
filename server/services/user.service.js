const Cart = require("../models/cart.model");
const Category = require("../models/category.model");
const Favorite = require("../models/favorite.model");
const Product = require("../models/product.model");
const Purchase = require("../models/purchase.model");
const Review = require("../models/review.model");
const User = require("../models/user.model");
const remove = require("../utils/remove.util");
const token = require("../utils/token.util");
const VerificationCode = require("../models/VerificationCode");
const { sendSms } = require("../utils/smsService");
const  Session = require("../models/session.model");

exports.signUpWithPhone = async (req, res) => {
  try {
    let { phone } = req.body;

    if (!phone) {
      return res.status(400).json({
        acknowledgement: false,
        message: "خطای درخواست",
        description: "شماره موبایل الزامی است.",
        isSuccess: false
      });
    }


    let user = await User.findOne({ phone });

    if (!user) {
      user = await User.create({ phone, phoneVerified: false });
    }

    const code = Math.floor(1000 + Math.random() * 9000);

    await VerificationCode.create({
      user: user._id,
      code,
      phone
    });

    await sendSms(
      phone,
      ` و  \ncode: ${code}\nکد ورود شما به وبسایت: ${code}\nلغو 11`
    );

    res.status(201).json({
      acknowledgement: true,
      message: "ارسال پیامک",
      description: "یک کد حاوی چهار رقم به موبایل شما پیامک شد",
      isSuccess: true
    });
  } catch (error) {
    console.error("خطا در ثبت‌نام با شماره تلفن:", error);
    res.status(500).json({
      acknowledgement: false,
      message: "خطای سرور",
      description: "مشکلی در پردازش درخواست پیش آمد.",
      isSuccess: false
    });
  }
};

exports.verifyPhone = async (req, res) => {
  let { phone, code } = req.body;
   const sessionUser = await Session.findOne({ sessionId: req.sessionID })

  if (!phone || !code) {
    return res.status(400).json({
      acknowledgement: false,
      message: "خطای درخواست",
      description: "شماره موبایل و کد تایید الزامی است.",
      isSuccess: false
    });
  }
  const user = await User.findOne({ phone });
  if (!user) {
    return res.status(404).json({
      acknowledgement: false,
      message: "کاربر یافت نشد",
      description: "این شماره در سیستم ثبت نشده است.",
      isSuccess: false
    });
  }

  const verification = await VerificationCode.findOne({ user: user._id })
  .sort({ createdAt: -1 }) 
  .limit(1);

  if (!verification) {
    return res.status(400).json({
      acknowledgement: false,
      message: "کد نامعتبر",
      description: "کد وارد شده صحیح نیست.",
      isSuccess: false
    });
  }

  if (verification.code !== Number(code)) {
    return res.status(400).json({
      acknowledgement: false,
      message: "کد نادرست",
      description: "کد تایید وارد شده صحیح نمی‌باشد.",
      isSuccess: false
    });
  }
  user.phoneVerified = true;
  if (sessionUser && sessionUser.cart && sessionUser.cart.length > 0) {
    if (!user.cart) {
      user.cart = [];
    }
    sessionUser.cart.forEach((item) => {
      if (!user.cart.some((userItem) => userItem.productId === item.productId)) {
        user.cart.push(item);
      }
    });
  }
  await user.save();



  const accessToken = token({ _id: user._id, phone: user.phone });

  res.status(200).json({
    acknowledgement: true,
    message: "ورود موفق",
    description: "شما با موفقیت وارد حساب کاربری شدید",
    accessToken,
    isSuccess: true
  });
};
exports.signUpWithGoogle = async (req, res) => {
  try {
    const sessionUser = await Session.findOne({ sessionId: req.sessionID });



    // تأیید توکن با Firebase
    // const { uid, email, name, picture } = decodedToken;

    // let user = await User.findOne({ googleId: uid });

    // if (!user) {
    //   user = new User({
    //     googleId: uid,
    //     email,
    //     name,
    //     "avatar.url": picture,
    //     emailVerified: true,
    //     userLevel: "verified"
    //   });

    //   if (sessionUser && sessionUser.cart && Array.isArray(sessionUser.cart) && sessionUser.cart.length > 0) {
    //     if (!user.cart) {
    //       user.cart = [];
    //     }

    //     sessionUser.cart.forEach((item) => {
    //       if (!user.cart.some((userItem) => userItem.productId === item.productId)) {
    //         user.cart.push(item);
    //       }
    //     });
    //   }

    //   await user.save();
    // }

    // const accessToken = token(user);

    res.status(200).json({
      acknowledgement: true,
      message: "ورود موفق",
      description: "شما با موفقیت وارد حساب خود شدید.",
      isSuccess: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      acknowledgement: false,
      message: "خطای سرور",
      description: "مشکلی در ورود با حساب گوگل پیش آمده است.",
      isSuccess: false,
      error: error.message 
    });
  }
};


/* get all users */
exports.getUsers = async (res) => {

  const users = await User.find();
  res.status(200).json({
    acknowledgement: true,
    message: "OK",
    description: "دریافت موفق کاربران",
    data: users
  });
};

/* get single user */
exports.getUser = async (req, res) => {
  const user = await User.findById(req.params.id);

  res.status(200).json({
    acknowledgement: true,
    message: "OK",
    description: `اطلاعات کاربر${user.name}' با موفقیت دریافت شد`,
    data: user
  });
};

/* update user information */
exports.updateUser = async (req, res) => {
  const existingUser = await User.findById(req.user._id);
  const user = req.body;

  // بررسی عدم تغییر نقش superAdmin
  
  // حذف تصویر آواتار قدیمی اگر تصویر جدیدی ارسال شده
  if (
    req.uploadedFiles &&
    req.uploadedFiles["avatar"] &&
    req.uploadedFiles["avatar"].length > 0
  ) {
    // حذف تصویر قبلی از سرویس ذخیره‌سازی
    await remove("avatar", existingUser.avatar?.public_id);

    // تنظیم تصویر جدید
    avatar = {
      url: req.uploadedFiles["avatar"][0].url,
      public_id: req.uploadedFiles["avatar"][0].key
    };
  } else if (!req.body.avatarUrl) {
    // اگر تصویر جدید نیست، حذف تصویر قبلی
    if (existingUser.avatar?.public_id) {
      await remove("avatar", existingUser.avatar.public_id);
    }

    // در صورت عدم ارسال آدرس جدید برای تصویر، مقدار پیش‌فرض
    avatar = {
      url: null,
      public_id: null
    };
  }

  // به‌روزرسانی اطلاعات کاربر
  const updatedUser = await User.findByIdAndUpdate(
    existingUser._id,
    {
      $set: {
        ...user,
        avatar // اطمینان از ارسال تصویر جدید
      }
    },
    {
      runValidators: true,
      new: true 
    }
  );

  res.status(200).json({
    acknowledgement: true,
    message: "OK",
    description: `اطلاعات ${updatedUser.name} با موفقیت تغییر کرد`
  });
};

exports.persistLogin = async (req, res) => {
  const user = await User.findById(req.user._id)
  .select('-password ') 
  .populate([
    {
      path: "cart",
      populate: [{ path: "product", populate: ["category"] }, "user"]
    },
    {
      path: "reviews",
      populate: ["product", "reviewer"]
    },
    {
      path: "favorites",
      populate: [
        {
          path: "product",
          populate: ["category"]
        },
        "user"
      ]
    },
    {
      path: "purchases",
      populate: ["customer", "products.product"]
    },
    "products"
  ]);

  if (!user) {
    res.status(404).json({
      acknowledgement: false,
      message: "Not Found",
      description: "کاربر یافت نشد"
    });
  } else {
    res.status(200).json({
      acknowledgement: true,
      message: "OK",
      description: "ورود با موفقیت انجام شد",
      data: user
    });
  }
};


/* update user information */
exports.updateUserInfo = async (req, res) => {
  const existingUser = await User.findById(req.params.id);
  const user = req.body;

  

  // متغیر avatar برای ذخیره‌سازی اطلاعات آواتار جدید
  let avatar = existingUser.avatar;

  // حذف تصویر آواتار قدیمی اگر تصویر جدیدی ارسال شده
  if (
    req.uploadedFiles &&
    req.uploadedFiles["avatar"] &&
    req.uploadedFiles["avatar"].length > 0
  ) {
    // حذف تصویر قبلی از سرویس ذخیره‌سازی
    await remove("avatar", existingUser.avatar?.public_id);

    // تنظیم تصویر جدید
    avatar = {
      url: req.uploadedFiles["avatar"][0].url,
      public_id: req.uploadedFiles["avatar"][0].key
    };
  } else if (req.body.avatarUrl) {
    // اگر تصویر جدید نیست، حذف تصویر قبلی
    if (existingUser.avatar?.public_id) {
      await remove("avatar", existingUser.avatar.public_id);
    }

    // در صورت عدم ارسال آدرس جدید برای تصویر، مقدار پیش‌فرض
    avatar = {
      url: null,
      public_id: null
    };
  }

  // به‌روزرسانی اطلاعات کاربر همراه با آواتار جدید
  const updatedUser = await User.findByIdAndUpdate(
    existingUser._id,
    { $set: { ...user, avatar } },
    {
      runValidators: true,
      new: true
    }
  );

  res.status(200).json({
    acknowledgement: true,
    message: "OK",
    description: `اطلاعات ${updatedUser.name} با موفقیت تغییر کرد`
  });
};

/* delete user information */
exports.deleteUser = async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.params.id,
    {
      isDeleted: true,
      deletedAt: Date.now()
    },
    { new: true }
  );

  if (!user) {
    return res.status(404).json({
      acknowledgement: false,
      message: "کاربر یافت نشد"
    });
  }
 

  // Soft delete user cart
  if (user.cart.length > 0) {
    await Cart.updateMany(
      { _id: { $in: user.cart } },
      { isDeleted: true, deletedAt: Date.now() }
    );
  }

  // Soft delete user favorites
  if (user.favorites.length > 0) {
    await Favorite.updateMany(
      { _id: { $in: user.favorites } },
      { isDeleted: true, deletedAt: Date.now() }
    );
  }

  // Soft delete user reviews
  if (user.reviews.length > 0) {
    await Review.updateMany(
      { _id: { $in: user.reviews } },
      { isDeleted: true, deletedAt: Date.now() }
    );
  }

  // Soft delete user purchases
  if (user.purchases.length > 0) {
    await Purchase.updateMany(
      { _id: { $in: user.purchases } },
      { isDeleted: true, deletedAt: Date.now() }
    );
  }

  // Soft delete category if exists
  if (user.category) {
    await Category.findByIdAndUpdate(user.category, {
      isDeleted: true,
      deletedAt: Date.now()
    });

    // Soft delete products of the category
    await Product.updateMany(
      { category: user.category },
      { isDeleted: true, deletedAt: Date.now() }
    );
  }

  // Remove user from product buyers array
  await Product.updateMany(
    { buyers: user._id },
    { $pull: { buyers: user._id } }
  );

  res.status(200).json({
    acknowledgement: true,
    message: "OK",
    description: ` کاربر${user.name}'s با موفقیت حذف شد`
  });
};
