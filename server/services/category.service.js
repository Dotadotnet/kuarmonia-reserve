const Category = require("../models/category.model");
const Admin = require("../models/admin.model");
const remove = require("../utils/remove.util");
const Translation = require("../models/translation.model");
const translateFields = require("../utils/translateFields");

/* add new category */
exports.addCategory = async (req, res) => {
  try {
    const { title, description, ...body } = req.body;

    const thumbnail = req.uploadedFiles?.thumbnail?.[0]
      ? {
          url: req.uploadedFiles.thumbnail[0].url,
          public_id: req.uploadedFiles.thumbnail[0].key
        }
      : null;

    const category = new Category({
      title,
      description,
      thumbnail,
      creator: req.admin._id,
      icon: body.icon
    });

    const result = await category.save();

    try {
      const translations = await translateFields(
        {
          title,
          description
        },
        {
          stringFields: ["title", "description"]
        }
      );
      const translationDocs = Object.entries(translations).map(
        ([lang, { fields }]) => ({
          language: lang,
          refModel: "Category",
          refId: result._id,
          fields
        })
      );
      insertedTranslations = await Translation.insertMany(translationDocs);

      const translationInfos = insertedTranslations.map((t) => ({
        translationId: t._id,
        language: t.language
      }));
      await Category.findByIdAndUpdate(result._id, {
        $set: { translations: translationInfos }
      });

      return res.status(201).json({
        acknowledgement: true,
        message: "Created",
        description: "دسته‌بندی با موفقیت ایجاد و ترجمه شد.",
        data: result
      });
    } catch (translationError) {
      console.log(translationError.message);
      await Category.findByIdAndDelete(result._id);
      return res.status(500).json({
        acknowledgement: false,
        message: "Translation Save Error",
        description: "خطا در ذخیره ترجمه‌ها. دسته‌بندی حذف شد.",
        error: translationError.message
      });
    }
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
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        acknowledgement: false,
        message: "Not Found",
        description: "دسته‌بندی پیدا نشد"
      });
    }

    let updatedCategory = req.body;
    // حذف تصویر قبلی در صورت آپلود جدید
    if (!req.body.thumbnail && req.file) {
      if (category.thumbnail?.public_id) {
        await remove(category.thumbnail.public_id);
      }

      updatedCategory.thumbnail = {
        url: req.file.path,
        public_id: req.file.filename
      };
    }

    const translatableFields = ["title", "description"];

    const changedFields = translatableFields.filter(
      (field) =>
        updatedCategory[field] && updatedCategory[field] !== category[field]
    );

    if (changedFields.length > 0) {
      const translations = await translateFields(
        updatedCategory,
        changedFields
      );

      for (const [language, { fields }] of Object.entries(translations)) {
        await Translation.findOneAndUpdate(
          {
            language,
            refModel: "Category",
            refId: category._id
          },
          { fields },
          { upsert: true, new: true }
        );
      }
    }
    console.log("Updated Category:", updatedCategory);
    await Category.findByIdAndUpdate(req.params.id, updatedCategory);

    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "دسته‌بندی با موفقیت ویرایش شد"
    });
  } catch (error) {
    console.error("Error in updateCategory:", error);
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطا در بروزرسانی دسته‌بندی",
      error: error.message
    });
  }
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
