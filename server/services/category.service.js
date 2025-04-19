const Category = require("../models/category.model");
const Admin = require("../models/admin.model");
const remove = require("../utils/remove.util");
const { translate } = require("google-translate-api-x");
const Translation = require("../models/translation.model");
/* add new category */
exports.addCategory = async (req, res) => {
  try {
    const { title, description, ...body } = req.body;

    let translatedTitle = "";
    let translatedDescription = "";
    let translatedTitleTr = "";
    let translatedDescriptionTr = "";

    // ترجمه عنوان و توضیحات به زبان‌های دیگر
    try {
      const resultTitleEn = await translate(title, { to: "en", client: "gtx" });
      translatedTitle = resultTitleEn.text;

      const resultDescriptionEn = await translate(description, { to: "en", client: "gtx" });
      translatedDescription = resultDescriptionEn.text;

      const resultTitleTr = await translate(title, { to: "tr", client: "gtx" });
      translatedTitleTr = resultTitleTr.text;

      const resultDescriptionTr = await translate(description, { to: "tr", client: "gtx" });
      translatedDescriptionTr = resultDescriptionTr.text;
    } catch (err) {
      console.error("خطا در ترجمه:", err);
      return res.status(500).json({
        acknowledgement: false,
        message: "Error",
        description: "خطایی در فرآیند ترجمه رخ داد",
        error: err.message
      });
    }

    let thumbnail = null;

    if (
      req.uploadedFiles &&
      req.uploadedFiles["thumbnail"] &&
      req.uploadedFiles["thumbnail"].length
    ) {
      thumbnail = {
        url: req.uploadedFiles["thumbnail"][0].url,
        public_id: req.uploadedFiles["thumbnail"][0].key
      };
    }

    const category = new Category({
      title,
      description,
      thumbnail,
      creator: req.admin._id,
      icon: body.icon
    });

    const result = await category.save();

    // ذخیره ترجمه‌ها برای عنوان و توضیحات
    const translationData = [
      {
        language: "en",
        refModel: "Category",
        refId: result._id,
        fields: {
          title: translatedTitle,
          description: translatedDescription
        }
      },
      {
        language: "tr",
        refModel: "Category",
        refId: result._id,
        fields: {
          title: translatedTitleTr,
          description: translatedDescriptionTr
        }
      }
    ];

    await Translation.insertMany(translationData);

    await Admin.findByIdAndUpdate(result.creator, {
      $set: {
        category: result._id
      }
    });

    res.status(201).json({
      acknowledgement: true,
      message: "Created",
      description: "دسته بندی با موفقیت ایجاد شد",
      data: result
    });
  } catch (error) {
    console.error("Error in addCategory:", error);
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطا در ایجاد دسته بندی",
      error: error.message
    });
  }
};

/* get all categories */
exports.getCategories = async (res) => {
  const categories = await Category.find({ isDeleted: { $ne: true } }).populate(
    {
      path: "creator",
      select: "name avatar"
    }
  );
  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "دسته بندی ها با موفقیت دریافت شدند",
    data: categories
  });
};

exports.getProductCategories = async (res) => {
  const categories = await Category.find().populate({
    path: "products",
    match: { isDeleted: false, status: "active", publishStatus: "approved" },
    select: "_id"
  });
  const filteredCategories = categories.filter(
    (category) => category.products.length > 0
  );

  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "دسته بندی ها با موفقیت دریافت شدند",
    data: filteredCategories
  });
};
/* get a category */
exports.getCategory = async (req, res) => {
  const category = await Category.findById(req.params.id);
  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "دسته بندی با موفقیت دریافت شد",
    data: category
  });
};

/* update category */
exports.updateCategory = async (req, res) => {
  const category = await Category.findById(req.params.id);
  let updatedCategory = req.body;
  if (!req.body.thumbnail && req.file) {
    await remove(category.thumbnail.public_id);

    updatedCategory.thumbnail = {
      url: req.file.path,
      public_id: req.file.filename
    };
  }

  updatedCategory.keynotes = JSON.parse(req.body.keynotes);
  updatedCategory.tags = JSON.parse(req.body.tags);

  await Category.findByIdAndUpdate(req.params.id, updatedCategory);

  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "Category updated successfully"
  });
};

/* delete category */
exports.deleteCategory = async (req, res) => {
  const category = await Category.findByIdAndUpdate(
    req.params.id,
    {
      isDeleted: true,
      deletedAt: Date.now()
    },
    { new: true }
  );

  if (!category) {
    return res.status(404).json({
      acknowledgement: false,
      message: "دسته بندی پیدا نشد",
      description: "دسته بندی  که می‌خواهید حذف کنید، وجود ندارد"
    });
  }

  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "دسته بندی با موفقیت حذف شد"
  });
};
