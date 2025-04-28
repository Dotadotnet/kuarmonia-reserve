/* internal import */
const Post = require("../models/post.model");
const Product = require("../models/product.model");
const User = require("../models/user.model");
const remove = require("../utils/remove.util");
const Category = require("../models/category.model");

/* add new post */
exports.addPost = async (req, res) => {
  try {
    const {
      tags,
      socialLinks,
      title,
      description,
      content,
      ...otherInformation
    } = req.body;
    let thumbnail = null;
    let gallery = [];
    const parsedTags = JSON.parse(tags);
    const parsedSocialLinks = JSON.parse(socialLinks);
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
    const post = await Post.create({
      ...otherInformation,
      creator: req.user._id,
      thumbnail,
      gallery,
      title,
      content,
      description,
      tags: parsedTags,
      socialLinks: parsedSocialLinks
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

    res.status(201).json({
      acknowledgement: true,
      message: "Created",
      description: "پست  با موفقیت ایجاد شد"
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

/* get all posts */
exports.getPosts = async (res) => {
  const posts = await Post.find().populate([
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
    data: posts
  });
};

/* get a post */
exports.getPost = async (req, res) => {
  const post = await Post.findById(req.params.id).populate([
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
    description: "Post fetched successfully",
    data: post
  });
};

/* update post */
exports.updatePost = async (req, res) => {
  let updatedPost = req.body;
  await Post.findByIdAndUpdate(req.params.id, updatedPost);
  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "Post updated successfully"
  });
};

/* delete post */
exports.deletePost = async (req, res) => {
  const post = await Post.findByIdAndDelete(req.params.id);
  await remove(post.logo.public_id);

  await Product.updateMany({ post: req.params.id }, { $unset: { post: "" } });
  await User.findByIdAndUpdate(post.creator, {
    $unset: { post: "" }
  });

  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "Post deleted successfully"
  });
};
