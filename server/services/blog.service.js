/* internal import */
const Blog = require("../models/blog.model");
const remove = require("../utils/remove.util");
const { translate } = require("google-translate-api-x");
const Translation = require("../models/translation.model");
/* add new blog */
exports.addBlog = async (req, res) => {
  try {
    const {
      tags,
      socialLinks,
      title,
      description,
      content,
      visibility ,
      ...otherInformation
    } = req.body;
    let thumbnail = null;
    let gallery = [];
    let translatedTitle = "";
    let translatedSummary = "";
    let translatedContent = "";
    let translatedTitleTr = "";
    let translatedSummaryTr = "";
    let translatedContentTr = "";
    try {
      console.log("Translating title to English...");
      const resultTitleEn = await translate(title, { to: "en", client: "gtx" });
      translatedTitle = resultTitleEn.text;
      console.log("Translated Title (EN):", translatedTitle);

      console.log("Translating description to English...");
      const resultSummaryEn = await translate(description, {
        to: "en",
        client: "gtx"
      });
      translatedSummary = resultSummaryEn.text;
      console.log("Translated Summary (EN):", translatedSummary);

      console.log("Translating content to English...");
      const resultContentEn = await translate(content, {
        to: "en",
        client: "gtx",
        forceBatch: false
      });
      translatedContent = resultContentEn.text;
      console.log("Translated Content (EN):", translatedContent);

      console.log("Translating title to Turkish...");
      const resultTitleTr = await translate(title, { to: "tr", client: "gtx" });
      translatedTitleTr = resultTitleTr.text;
      console.log("Translated Title (TR):", translatedTitleTr);

      console.log("Translating description to Turkish...");
      const resultSummaryTr = await translate(description, {
        to: "tr",
        client: "gtx"
      });
      translatedSummaryTr = resultSummaryTr.text;
      console.log("Translated Summary (TR):", translatedSummaryTr);

      console.log("Translating content to Turkish...");
      const resultContentTr = await translate(content, {
        to: "tr",
        client: "gtx",
        forceBatch: false
      });
      translatedContentTr = resultContentTr.text;
      console.log("Translated Content (TR):", translatedContentTr);
    } catch (err) {
      console.error("خطا در ترجمه:", err);
      return res.status(500).json({
        acknowledgement: false,
        message: "Error",
        description: "خطایی در فرآیند ترجمه رخ داد",
        error: err.message
      });
    }
 
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
      title,
      content,
      description,
      tags: JSON.parse(tags),
      socialLinks: JSON.parse(socialLinks),
      visibility: visibility ? "public" : "private"
    });
    const { metaTitle, metaDescription } = blog;

    const [translatedMetaTitleEn, translatedMetaDescriptionEn] =
      await Promise.all([
        translate(metaTitle, { to: "en", client: "gtx" }),
        translate(metaDescription, { to: "en", client: "gtx" })
      ]);

    const [translatedMetaTitleTr, translatedMetaDescriptionTr] =
      await Promise.all([
        translate(metaTitle, { to: "tr", client: "gtx" }),
        translate(metaDescription, { to: "tr", client: "gtx" })
      ]);
    const translationData = [
      {
        language: "en",
        refModel: "Blog",
        refId: blog._id,
        fields: {
          title: translatedTitle,
          description: translatedSummary,
          content: translatedContent,
          metaTitle: translatedMetaTitleEn.text,
          metaDescription: translatedMetaDescriptionEn.text
        }
      },
      {
        language: "tr",
        refModel: "Blog",
        refId: blog._id,
        fields: {
          title: translatedTitleTr,
          description: translatedSummaryTr,
          content: translatedContentTr,
          metaTitle: translatedMetaTitleTr.text,
          metaDescription: translatedMetaDescriptionTr.text
        }
      }
    ];

    try {
      const savedTranslations = await Translation.insertMany(translationData);
      const translationIds = savedTranslations.map((t) => t._id);
      await Blog.findByIdAndUpdate(blog._id, {
        $set: { translations: translationIds }
      });
    
    } catch (translationError) {
      await Blog.findByIdAndDelete(blog._id);
      return res.status(500).json({
        acknowledgement: false,
        message: "Translation Save Error",
        description: "خطا در ذخیره ترجمه‌ها. پست بلاگ حذف شد.",
        error: translationError.message
      });
    }
    
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
