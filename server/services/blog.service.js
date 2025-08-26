/* internal import */
const Blog = require("../models/blog.model");
const remove = require("../utils/remove.util");
const { translate } = require("google-translate-api-x");
const { generateSlug, generateSeoFields } = require("../utils/seoUtils");
const Catagory = require("../models/category.model");
const translateFields = require("../utils/translateFields");
const Translation = require("../models/translation.model");
const replaceRef = require("../utils/replaceRef");
const Category = require("../models/category.model");
/* add new blog */
exports.addBlog = async (req, res) => {
  try {
    const {
      tags,
      socialLinks,
      title,
      description,
      content,
      category,
      visibility,
      ...otherInformation
    } = req.body;
    let thumbnail = null;
    let gallery = [];

    if (req.uploadedFiles["thumbnail"].length) {
      thumbnail = {
        url: req.uploadedFiles["thumbnail"][0].url,
        public_id: req.uploadedFiles["thumbnail"][0].key
      };
    }

    if (
      req.uploadedFiles["gallery"] &&
      req.uploadedFiles["gallery"].length > 0
    ) {
      gallery = req.uploadedFiles["gallery"].map((file) => ({
        url: file.url,
        public_id: file.key
      }));
    }


    const blog = await Blog.create({
      ...otherInformation,
      creator: req.admin._id,
      thumbnail,
      gallery,
      category,
      tags: JSON.parse(tags),
      socialLinks: JSON.parse(socialLinks),
      visibility: visibility ? "public" : "private",
    });


    const slug = title.replaceAll(" ","-");
    const categoryObj = await Category.findById(category).lean()
    const replaceRefClass = new replaceRef(categoryObj, req);
    const replaceRefData = await replaceRefClass.getRefFields()
    const { metaTitle, metaDescription } = generateSeoFields({
      title,
      summary: description,
      categoryTitle: replaceRefData.translations.fa.title
    });

    const translations = await translateFields(
      {
        title,
        description,
        slug,
        metaTitle,
        metaDescription,
        content
      },
      {
        stringFields: [
          "title",
          "description",
          "slug",
          "metaTitle",
          "metaDescription"
        ],
        longTextFields: ["content"]
      }
    );
    const translationDocs = Object.entries(translations).map(
      ([lang, { fields }]) => ({
        language: lang,
        refModel: "Blog",
        refId: blog._id,
        fields
      })
    );

    const savedTranslations = await Translation.insertMany(translationDocs);

    const translationInfos = savedTranslations.map((t) => ({
      translation: t._id,
      language: t.language
    }));


    await Blog.findByIdAndUpdate(blog._id, {
      $set: { translations: translationInfos }
    });

    res.status(201).json({
      acknowledgement: true,
      message: "Created",
      description: "مجله  با موفقیت ایجاد شد"
    });
  } catch (error) {
    console.log("Error during blogs creation:", error);
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: error.message,
      error: error.message
    });
  }
};

/* get all blogs */
exports.getBlogs = async (res) => {
  const blogs = await Blog.find().populate([
    {
      path: "creator",
      select: "name avatar"
    },
    {
      path: "category",
      select: "title"
    }
  ]);
  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "واحد ها با موفقیت دریافت شدند",
    data: blogs
  });
};

/* get a blog */
exports.getBlog = async (req, res) => {
  const blog = await Blog.findById(req.params.id).populate([
    {
      path: "creator",
      select: "name avatar" // دریافت فقط name و avatar از creator
    },
    {
      path: "tags",
      select: "title _id" // دریافت فقط title و _id از tags
    }
  ]);

  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "Blog fetched successfully",
    data: blog
  });
};

/* update blog */
exports.updateBlog = async (req, res) => {
  let updatedBlog = req.body;
  await Blog.findByIdAndUpdate(req.params.id, updatedBlog);
  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "Blog updated successfully"
  });
};

/* delete blog */
exports.deleteBlog = async (req, res) => {
  const blog = await Blog.findByIdAndDelete(req.params.id);
  await remove(blog.logo.public_id);

  await Product.updateMany({ blog: req.params.id }, { $unset: { blog: "" } });
  await User.findByIdAndUpdate(blog.creator, {
    $unset: { blog: "" }
  });

  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "Blog deleted successfully"
  });
};
