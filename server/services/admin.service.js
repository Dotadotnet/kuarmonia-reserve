const Cart = require("../models/cart.model");
const Category = require("../models/category.model");
const Favorite = require("../models/favorite.model");
const Product = require("../models/product.model");
const Purchase = require("../models/purchase.model");
const Review = require("../models/review.model");
const Admin = require("../models/admin.model");
const remove = require("../utils/remove.util");
const token = require("../utils/token.util");

/* sign up an admin */
exports.signUp = async (req, res) => {
  try {
    const { body } = req;
    const { name, email, password, phone, avatarUrl } = body;

    console.log(body);

    // اعتبارسنجی اولیه
    if (!name || !email || !password || !phone) {
      return res.status(400).json({
        acknowledgement: false,
        message: "درخواست نادرست",
        description: "همه فیلدها الزامی است",
        isSuccess: false,
      });
    }

    // بررسی وجود کاربر تکراری
    const existingAdmin = await Admin.findOne({
      $or: [{ email }, { phone }],
    });

    if (existingAdmin) {
      return res.status(409).json({
        acknowledgement: false,
        message: "کاربر تکراری",
        description:
          "کاربری با این ایمیل یا شماره تلفن قبلاً ثبت‌نام کرده است. لطفاً به صفحه ورود بروید.",
        redirectToLogin: true,
        isSuccess: false,
      });
    }

    // پردازش آواتار
    let avatar = {
      url: avatarUrl || null,
      public_id: null,
    };

    if (
      req.uploadedFiles &&
      req.uploadedFiles["avatar"] &&
      req.uploadedFiles["avatar"].length > 0
    ) {
      avatar = {
        url: req.uploadedFiles["avatar"][0].url,
        public_id: req.uploadedFiles["avatar"][0].key,
      };
    }

    // تنظیم نقش و وضعیت
    const adminCount = await Admin.countDocuments();
    const role = adminCount === 0 ? "superAdmin" : "operator";
    const status = adminCount === 0 ? "active" : "inactive";

    // ایجاد کاربر جدید
    const admin = new Admin({
      name,
      email,
      password,
      phone,
      role,
      status,
      avatar,
    });

    await admin.save();

    return res.status(201).json({
      acknowledgement: true,
      message: "تبریک!",
      description: "ثبت‌نام شما با موفقیت انجام شد.",
      isSuccess: true,
      data: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
        status: admin.status,
      },
    });
  } catch (error) {
    console.error("signUp error:", error);
    return res.status(500).json({
      acknowledgement: false,
      message: "خطای داخلی سرور",
      description: error.message,
      isSuccess: false,
    });
  }
};

/* sign in an admin */
exports.signIn = async (req, res) => {
  const admin = await Admin.findOne({ email: req.body.email });
  if (!admin) {
    res.status(404).json({
      acknowledgement: false,
      message: "Not Found",
      description: "کاربر یافت نشد"
    });
  } else {
    const isPasswordValid = admin.comparePassword(
      req.body.password,
      admin.password
    );

    if (!isPasswordValid) {
      res.status(401).json({
        acknowledgement: false,
        message: "Unauthorized",
        description: "رمز عبور صحیح نیست"
      });
    } else {
      if (admin.status === "inactive") {
        res.status(401).json({
          acknowledgement: false,
          message: "Unauthorized",
          description: "حساب شما در حال حاضر  غیر فعال است لطفا منتظر بمانید"
        });
      } else {
        const accessToken = token({
          _id: admin._id,
          name: admin.name,
          email: admin.email,
          role: admin.role,
          status: admin.status
        });

        res.status(200).json({
          acknowledgement: true,
          message: "OK",
          description: "شمابا موفقیت ورود کردید",
          accessToken
        });
      }
    }
  }
};

/* reset admin password */
exports.forgotPassword = async (req, res) => {
  const admin = await Admin.findOne({ email: req.body.email });

  if (!admin) {
    res.status(404).json({
      acknowledgement: false,
      message: "Not Found",
      description: "کاربر یافت نشد"
    });
  } else {
    const hashedPassword = admin.encryptedPassword(req.body.password);

    await Admin.findOneAndUpdate(
      { email: req.body.email },
      { password: hashedPassword },
      { runValidators: false, returnOriginal: false }
    );

    res.status(200).json({
      acknowledgement: true,
      message: "OK",
      description: "پسورد کاربر با موفقیت تغییر کرد"
    });
  }
};

/* login persistance */
exports.persistLogin = async (req, res) => {
  const admin = await Admin.findById(req.admin._id).select("-password -phone");

  if (!admin) {
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
      data: admin
    });
  }
};

/* get all admins */
exports.getAdmins = async (res) => {
  const admins = await Admin.find();

  res.status(200).json({
    acknowledgement: true,
    message: "OK",
    description: "دریافت موفق کاربران",
    data: admins
  });
};

/* get single admin */
exports.getAdmin = async (req, res) => {
  const admin = await Admin.findById(req.params.id);

  res.status(200).json({
    acknowledgement: true,
    message: "OK",
    description: `اطلاعات کاربر${admin.name}' با موفقیت دریافت شد`,
    data: admin
  });
};

/* update admin information */
exports.updateAdmin = async (req, res) => {
  const existingAdmin = await Admin.findById(req.admin._id);
  const admin = req.body;

  // بررسی عدم تغییر نقش superAdmin
  if (admin.role === "superAdmin") {
    return res.status(403).json({
      acknowledgement: false,
      message: "Forbidden",
      description: "کاربر مدیر کل قابل ویرایش نیست"
    });
  }

  // حذف تصویر آواتار قدیمی اگر تصویر جدیدی ارسال شده
  if (
    req.uploadedFiles &&
    req.uploadedFiles["avatar"] &&
    req.uploadedFiles["avatar"].length > 0
  ) {
    // حذف تصویر قبلی از سرویس ذخیره‌سازی
    await remove("avatar", existingAdmin.avatar?.public_id);

    // تنظیم تصویر جدید
    avatar = {
      url: req.uploadedFiles["avatar"][0].url,
      public_id: req.uploadedFiles["avatar"][0].key
    };
  } else if (!req.body.avatarUrl) {
    // اگر تصویر جدید نیست، حذف تصویر قبلی
    if (existingAdmin.avatar?.public_id) {
      await remove("avatar", existingAdmin.avatar.public_id);
    }

    // در صورت عدم ارسال آدرس جدید برای تصویر، مقدار پیش‌فرض
    avatar = {
      url: null,
      public_id: null
    };
  }

  // به‌روزرسانی اطلاعات کاربر
  const updatedAdmin = await Admin.findByIdAndUpdate(
    existingAdmin._id,
    {
      $set: {
        ...admin,
        avatar // اطمینان از ارسال تصویر جدید
      }
    },
    {
      runValidators: true,
      new: true // اطمینان از اینکه داده‌های به‌روزرسانی‌شده برگردند
    }
  );

  res.status(200).json({
    acknowledgement: true,
    message: "OK",
    description: `اطلاعات ${updatedAdmin.name} با موفقیت تغییر کرد`
  });
};

/* update admin information */
exports.updateAdminInfo = async (req, res) => {
  const existingAdmin = await Admin.findById(req.params.id);
  const admin = req.body;

  // بررسی عدم تغییر نقش superAdmin
  if (admin.role === "superAdmin") {
    return res.status(403).json({
      acknowledgement: false,
      message: "دسترسی ممنوع",
      description: "کاربر مدیر کل قابل ویرایش نیست"
    });
  }

  // متغیر avatar برای ذخیره‌سازی اطلاعات آواتار جدید
  let avatar = existingAdmin.avatar;

  // حذف تصویر آواتار قدیمی اگر تصویر جدیدی ارسال شده
  if (
    req.uploadedFiles &&
    req.uploadedFiles["avatar"] &&
    req.uploadedFiles["avatar"].length > 0
  ) {
    // حذف تصویر قبلی از سرویس ذخیره‌سازی
    await remove("avatar", existingAdmin.avatar?.public_id);

    // تنظیم تصویر جدید
    avatar = {
      url: req.uploadedFiles["avatar"][0].url,
      public_id: req.uploadedFiles["avatar"][0].key
    };
  } else if (req.body.avatarUrl) {
    // اگر تصویر جدید نیست، حذف تصویر قبلی
    if (existingAdmin.avatar?.public_id) {
      await remove("avatar", existingAdmin.avatar.public_id);
    }

    // در صورت عدم ارسال آدرس جدید برای تصویر، مقدار پیش‌فرض
    avatar = {
      url: null,
      public_id: null
    };
  }

  // به‌روزرسانی اطلاعات کاربر همراه با آواتار جدید
  const updatedAdmin = await Admin.findByIdAndUpdate(
    existingAdmin._id,
    { $set: { ...admin, avatar } },
    {
      runValidators: true,
      new: true
    }
  );

  res.status(200).json({
    acknowledgement: true,
    message: "OK",
    description: `اطلاعات ${updatedAdmin.name} با موفقیت تغییر کرد`
  });
};

/* delete admin information */
exports.deleteAdmin = async (req, res) => {
  const admin = await Admin.findByIdAndUpdate(
    req.params.id,
    {
      isDeleted: true,
      deletedAt: Date.now()
    },
    { new: true }
  );

  if (!admin) {
    return res.status(404).json({
      acknowledgement: false,
      message: "کاربر یافت نشد"
    });
  }
  if (admin.role === "superAdmin") {
    return res.status(403).json({
      acknowledgement: false,
      message: "ممنوع",
      description: "کاربر مدیر کل قابل حذف نیست"
    });
  }

  // Soft delete admin cart
  if (admin.cart.length > 0) {
    await Cart.updateMany(
      { _id: { $in: admin.cart } },
      { isDeleted: true, deletedAt: Date.now() }
    );
  }

  // Soft delete admin favorites
  if (admin.favorites.length > 0) {
    await Favorite.updateMany(
      { _id: { $in: admin.favorites } },
      { isDeleted: true, deletedAt: Date.now() }
    );
  }

  // Soft delete admin reviews
  if (admin.reviews.length > 0) {
    await Review.updateMany(
      { _id: { $in: admin.reviews } },
      { isDeleted: true, deletedAt: Date.now() }
    );
  }

  // Soft delete admin purchases
  if (admin.purchases.length > 0) {
    await Purchase.updateMany(
      { _id: { $in: admin.purchases } },
      { isDeleted: true, deletedAt: Date.now() }
    );
  }

  // Soft delete category if exists
  if (admin.category) {
    await Category.findByIdAndUpdate(admin.category, {
      isDeleted: true,
      deletedAt: Date.now()
    });

    // Soft delete products of the category
    await Product.updateMany(
      { category: admin.category },
      { isDeleted: true, deletedAt: Date.now() }
    );
  }

  // Remove admin from product buyers array
  await Product.updateMany(
    { buyers: admin._id },
    { $pull: { buyers: admin._id } }
  );

  res.status(200).json({
    acknowledgement: true,
    message: "OK",
    description: ` کاربر${admin.name}'s با موفقیت حذف شد`
  });
};
