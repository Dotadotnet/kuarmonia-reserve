const Category = require("../models/category.model");
const remove = require("../utils/remove.util");
const Translation = require("../models/translation.model");
const { generateSlug } = require("../utils/seoUtils");
const translateFields = require("../utils/translateFields");

const defaultDomain = process.env.NEXT_PUBLIC_CLIENT_URL;
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
      thumbnail,
      creator: req.admin._id,
      icon: body.icon
    });

    const result = await category.save();
    const slug = await generateSlug(title);
    const canonicalUrl = `${defaultDomain}/category/${slug}`;

    try {
      const translations = await translateFields(
        {
          title,
          description,
          slug,
          canonicalUrl
        },
        {
          stringFields: ["title", "description","slug","canonicalUrl"]
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
      const  insertedTranslations = await Translation.insertMany(translationDocs);

      const translationInfos = insertedTranslations.map((t) => ({
        translation: t._id,
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
exports.getCategories = async (req, res) => {
  try {
    let categories = [];
    try {
      categories = await Category.find({ isDeleted: { $ne: true } }).populate([
        {
          path: "translations.translation",
          match: { language: req.locale },
        },
        {
          path: "creator",
          select: "name avatar",
        }
      ]);
    } catch (error) {
      console.error("Error populating categories:", error);
    }
    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "دسته بندی ها با موفقیت دریافت شدند",
      data: categories,
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطا در دریافت دسته بندی ها",
      error: error.message,
    });
  }
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
