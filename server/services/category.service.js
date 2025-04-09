
const Category = require("../models/category.model");
const Admin = require("../models/admin.model");
const remove = require("../utils/remove.util");

/* add new category */
exports.addCategory = async (req, res) => {
  try {
    const { body } = req;

    let thumbnail = null;

    if (req.uploadedFiles && req.uploadedFiles["thumbnail"] && req.uploadedFiles["thumbnail"].length) {
      thumbnail = {
        url: req.uploadedFiles["thumbnail"][0].url,
        public_id: req.uploadedFiles["thumbnail"][0].key,
      };
    }

    const category = new Category({
      title: body.title,
      description: body.description,
      thumbnail: thumbnail,
      creator: req.admin._id,
      icon:body.icon,
    });

    const result = await category.save();

    await Admin.findByIdAndUpdate(result.creator, {
      $set: {
        category: result._id,
      },
    });

    res.status(201).json({
      acknowledgement: true,
      message: "Created",
      description: "دسته بندی با موفقیت ایجاد شد",
    });
  } catch (error) {
    console.error("Error in addCategory:", error);
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطا در ایجاد دسته بندی",
      error: error.message,
    });
  }
};

/* get all categories */
exports.getCategories = async (res) => {
  const categories = await Category.find({ isDeleted: { $ne: true } })
  .populate({
    path: "creator",
    select: "name avatar", 
  });
  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "دسته بندی ها با موفقیت دریافت شدند",
    data: categories,
  });
};




exports.getProductCategories = async (res) => {
  const categories = await Category.find().populate({
    path: "products",
    match: { isDeleted: false, status: "active" ,publishStatus:"approved"},
    select: "_id",
  });
  const filteredCategories = categories.filter(category => category.products.length > 0);

  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "دسته بندی ها با موفقیت دریافت شدند",
    data: filteredCategories,
  });
};
/* get a category */
exports.getCategory = async (req, res) => {
  const category = await Category.findById(req.params.id);
  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "دسته بندی با موفقیت دریافت شد",
    data: category,
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
      public_id: req.file.filename,
    };
  }

  updatedCategory.keynotes = JSON.parse(req.body.keynotes);
  updatedCategory.tags = JSON.parse(req.body.tags);

  await Category.findByIdAndUpdate(req.params.id, updatedCategory);

  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "Category updated successfully",
  });
};

/* delete category */
exports.deleteCategory = async (req, res) => {

  const category = await Category.findByIdAndUpdate(req.params.id,
    {
      isDeleted: true,
      deletedAt: Date.now(),
    },
    { new: true }
  );
    
  if (!category) {
    return res.status(404).json({
      acknowledgement: false,
      message: "دسته بندی پیدا نشد",
      description: "دسته بندی  که می‌خواهید حذف کنید، وجود ندارد",
    });
  }

  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "دسته بندی با موفقیت حذف شد",
  });
};
