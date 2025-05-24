const Cart = require("../models/cart.model");
const Category = require("../models/category.model");
const Favorite = require("../models/favorite.model");
const Product = require("../models/product.model");
const Purchase = require("../models/purchase.model");
const Review = require("../models/review.model");
const Admin = require("../models/admin.model");
const remove = require("../utils/remove.util");
const token = require("../utils/token.util");
const translateFields = require("../utils/translateFields");
const Translation = require("../models/translation.model");
const Address = require("../models/address.model");

exports.signUp = async (req, res) => {
  try {
    const { body } = req;
    const { name, email, password, phone, avatarUrl, bio, address } = body;
    const parseAddress = JSON.parse(address);

    if (!name || !email || !password || !phone || !bio || !address) {
      return res.status(400).json({
        acknowledgement: false,
        message: "درخواست نادرست",
        description: "همه فیلدها الزامی است",
        isSuccess: false
      });
    }

    const existingAdmin = await Admin.findOne({
      $or: [{ email }, { phone }]
    });

    if (existingAdmin) {
      return res.status(409).json({
        acknowledgement: false,
        message: "کاربر تکراری",
        description:
          "کاربری با این ایمیل یا شماره تلفن قبلاً ثبت‌نام کرده است. لطفاً به صفحه ورود بروید.",
        redirectToLogin: true,
        isSuccess: false
      });
    }
    const addressProp = await Address.create({
      country: parseAddress.country,
      city: parseAddress.city,
      street: parseAddress.street,
      state: parseAddress.state,
      floor: parseAddress.floor,
      unit: parseAddress.unit,
      plateNumber: parseAddress.plateNumber,
      phone: phone,
      email: email,
      postalCode: parseAddress.postalCode
    });
    let avatar = {
      url: avatarUrl || null,
      public_id: null
    };

    if (
      req.uploadedFiles &&
      req.uploadedFiles["avatar"] &&
      req.uploadedFiles["avatar"].length > 0
    ) {
      avatar = {
        url: req.uploadedFiles["avatar"][0].url,
        public_id: req.uploadedFiles["avatar"][0].key
      };
    }

    const adminCount = await Admin.countDocuments();
    const role = adminCount === 0 ? "superAdmin" : "operator";
    const status = adminCount === 0 ? "active" : "inactive";

    const admin = new Admin({
      name,
      email,
      password,
      phone,
      address: addressProp._id,
      role,
      status,
      avatar
    });
    const result = await admin.save();
    addressProp.admin = admin._id;

    try {
      const translations = await translateFields(
        {
          name,
          bio
        },
        {
          stringFields: ["name", "bio"]
        }
      );
      const translationDocs = Object.entries(translations).map(
        ([lang, { fields }]) => ({
          language: lang,
          refModel: "Admin",
          refId: result._id,
          fields
        })
      );
      const insertedTranslations = await Translation.insertMany(
        translationDocs
      );

      const translationInfos = insertedTranslations.map((t) => ({
        translation: t._id,
        language: t.language
      }));
      await Admin.findByIdAndUpdate(result._id, {
        $set: { translations: translationInfos }
      });

      return res.status(201).json({
        acknowledgement: true,
        message: "Created",
        description: "کاربر با موفقیت ایجاد و ترجمه شد.",
        data: result
      });
    } catch (translationError) {
      console.log(translationError.message);
      await Admin.findByIdAndDelete(result._id);
      return res.status(500).json({
        acknowledgement: false,
        message: "Translation Save Error",
        description: "خطا در ذخیره کاربر  کاربر حذف شد.",
        error: translationError.message
      });
    }
  } catch (error) {
    console.error("signUp error:", error);
    return res.status(500).json({
      acknowledgement: false,
      message: "خطای داخلی سرور",
      description: error.message,
      isSuccess: false
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

exports.persistLogin = async (req, res) => {
  const admin = await Admin.findById(req.admin._id)
    .select("-password")
    .populate([
      {
        path: "translations.translation",
        match: { language: req.locale }
      }
    ]);

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

/* get single admin */
exports.getAdmin = async (req, res) => {
  const admin = await Admin.findById(req.params.id)
    .select("-password")
    .populate([
      {
        path: "translations.translation",
        match: { language: req.locale }
      },
      {
        path: "address"
      }
    ]);
  res.status(200).json({
    acknowledgement: true,
    message: "OK",
    description: `اطلاعات کاربر${admin.name}' با موفقیت دریافت شد`,
    data: admin
  });
};

/* get all admins */
exports.getAdmins = async (req, res) => {
  const admins = await Admin.find().populate([
    {
      path: "translations.translation",
      match: { language: req.locale }
    }
  ]);

  res.status(200).json({
    acknowledgement: true,
    message: "OK",
    description: "دریافت موفق کاربران",
    data: admins
  });
};

exports.updateAdmin = async (req, res) => {
  try {
    const existingAdmin = await Admin.findById(req.params.id).populate(
      "address"
    );

    if (!existingAdmin) {
      return res.status(404).json({
        acknowledgement: false,
        message: "not found",
        description: "کاربر یافت نشد"
      });
    }

    const {
      name,
      email,
      phone,
      bio,
      role,
      status,
      country,
      city,
      street,
      state,
      floor,
      unit,
      plateNumber,
      postalCode,
      avatarUrl
    } = req.body;
    console.log("role", role);
    if (role === "superAdmin") {
      return res.status(403).json({
        acknowledgement: false,
        message: "Forbidden",
        description: "کاربر مدیر کل قابل ویرایش نیست"
      });
    }

    await Address.findByIdAndUpdate(existingAdmin.address._id, {
      country,
      city,
      street,
      state,
      floor,
      unit,
      plateNumber,
      postalCode,
      email,
      phone
    });

    let avatar = existingAdmin.avatar;
    console.log("avatar", avatar);
    console.log("req.uploadedFiles", req.uploadedFiles);
    if (
      req.uploadedFiles &&
      req.uploadedFiles["avatar"] &&
      req.uploadedFiles["avatar"].length > 0
    ) {
      await remove("avatar", existingAdmin.avatar?.public_id);
      avatar = {
        url: req.uploadedFiles["avatar"][0].url,
        public_id: req.uploadedFiles["avatar"][0].key
      };
    }
    console.log("avatar", avatar);
    const updatedAdmin = await Admin.findByIdAndUpdate(
      existingAdmin._id,
      {
        $set: {
          email,
          phone,
          role,
          status,
          avatar
        }
      },
      { new: true, runValidators: true }
    );

    console.log("updatedAdmin", updatedAdmin);

    res.status(200).json({
      acknowledgement: true,
      message: "OK",
      description: `اطلاعات ${name} با موفقیت تغییر کرد`
    });
  } catch (error) {
    console.error("Error updating admin:", error);
    res.status(500).json({
      acknowledgement: false,
      message: "خطای داخلی سرور",
      description: error.message
    });
  }
};

exports.updateAdminInfo = async (req, res) => {
  if (!req.params.id) {
    return res.status(400).json({
      acknowledgement: false,
      message: "Invalid request",
      description: "شناسه کاربری ارسال نشده است"
    });
  }
  console.log(req.params);
  console.log(req.body);
  try {
    const existingAdmin = await Admin.findById(req.params.id).populate(
      "address"
    );

    if (!existingAdmin) {
      return res.status(404).json({
        acknowledgement: false,
        message: "not found",
        description: "کاربر یافت نشد"
      });
    }

    const {
      name,
      email,
      phone,
      bio,
      role,
      status,
      country,
      city,
      street,
      state,
      floor,
      unit,
      plateNumber,
      postalCode,
      avatarUrl
    } = req.body;

    if (existingAdmin.address) {
      await Address.findByIdAndUpdate(existingAdmin.address._id, {
        country,
        city,
        street,
        state,
        floor,
        unit,
        plateNumber,
        postalCode,
        email,
        phone
      });
    } else {
      const newAddress = new Address({
        country,
        city,
        street,
        state,
        floor,
        unit,
        plateNumber,
        postalCode,
        email,
        phone
      });

      await Admin.findByIdAndUpdate(existingAdmin._id, {
        address: newAddress._id
      });
      await newAddress.save();
    }
    let avatar = existingAdmin.avatar;
    if (
      req.uploadedFiles &&
      req.uploadedFiles["avatar"] &&
      req.uploadedFiles["avatar"].length > 0
    ) {
      await remove("avatar", existingAdmin.avatar?.public_id);
      avatar = {
        url: req.uploadedFiles["avatar"][0].url,
        public_id: req.uploadedFiles["avatar"][0].key
      };
    }
    const result = await Admin.findByIdAndUpdate(
      existingAdmin._id,
      {
        $set: {
          email,
          phone,
          role,
          status,
          avatar
        }
      },
      { new: true, runValidators: true }
    );
    if (result.translations && result.translations.length > 0) {
      await Promise.all(
        result.translations.map(async ({ translation, language }) => {
          const translatedFields = await translateFields(
            { name, bio },
            { stringFields: ["name", "bio"], targetLanguages: [language] }
          );

          await Translation.findByIdAndUpdate(translation, {
            fields: translatedFields[language].fields
          });
        })
      );
    } else {
      const translations = await translateFields(
        {
          name,
          bio
        },
        {
          stringFields: ["name", "bio"]
        }
      );
      const translationDocs = Object.entries(translations).map(
        ([lang, { fields }]) => ({
          language: lang,
          refModel: "Admin",
          refId: result._id,
          fields
        })
      );
      const insertedTranslations = await Translation.insertMany(
        translationDocs
      );

      const translationInfos = insertedTranslations.map((t) => ({
        translation: t._id,
        language: t.language
      }));
      await Admin.findByIdAndUpdate(result._id, {
        $set: { translations: translationInfos }
      });
    }

    res.status(200).json({
      acknowledgement: true,
      message: "OK",
      description: `اطلاعات ${name} با موفقیت تغییر کرد`
    });
  } catch (error) {
    console.error("Error updating admin:", error);
    res.status(500).json({
      acknowledgement: false,
      message: "خطای داخلی سرور",
      description: error.message
    });
  }
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
