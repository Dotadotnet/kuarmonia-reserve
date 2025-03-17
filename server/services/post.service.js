

/* internal import */
const Post = require("../models/post.model");
const Product = require("../models/product.model");
const User = require("../models/user.model");
const remove = require("../utils/remove.util");
const Category = require("../models/category.model");

/* add new post */
exports.addPost = async (req, res) => {
  const {tags,socialLinks,...otherInformation} = req.body;
  let thumbnail = null;
  let gallery = [];
  const parsedTags = JSON.parse(tags);
  const parsedSocialLinks = JSON.parse(socialLinks);
  if (req.uploadedFiles["thumbnail"].length) {
    thumbnail = {
      url: req.uploadedFiles["thumbnail"][0].url,
      public_id: req.uploadedFiles["thumbnail"][0].key,
    };
  }

  if (req.uploadedFiles["gallery"] && req.uploadedFiles["gallery"].length > 0) {
    gallery = req.uploadedFiles["gallery"].map((file) => ({
      url: file.url,
      public_id: file.key,
    }));
  }
  const post = await Post.create({
    ...otherInformation,
    creator: req.user._id,
    thumbnail,
    gallery,  
    tags:parsedTags,
    socialLinks:parsedSocialLinks

  });
  await Category.findByIdAndUpdate(post.category, {
    $push: { posts: post._id },
  });


  res.status(201).json({
    acknowledgement: true,
    message: "Created",
    description: "پست  با موفقیت ایجاد شد",
  });
};

/* get all posts */
exports.getPosts = async (res) => {

  const posts = await Post.find()
  .select('title description publishDate thumbnail creator category') 
  .populate([
    {
      path: 'creator',
      select: 'name avatar'  
    },
    {
      path: 'category',
      select: 'title'
    }
  ]);
  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "واحد ها با موفقیت دریافت شدند",
    data: posts,
  });
};

/* get a post */
exports.getPost = async (req, res) => {
  const post = await Post.findById(req.params.id).populate([
    {
      path: "creator",
      select: "name avatar", // دریافت فقط name و avatar از creator
    },
    {
      path: "tags",
      select: "title _id", // دریافت فقط title و _id از tags
    },
  ]);
  
  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "Post fetched successfully",
    data: post,
  });
};

/* update post */
exports.updatePost = async (req, res) => {
  let updatedPost = req.body;
  await Post.findByIdAndUpdate(req.params.id, updatedPost);
  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "Post updated successfully",
  });
};

/* delete post */
exports.deletePost = async (req, res) => {
  const post = await Post.findByIdAndDelete(req.params.id);
  await remove(post.logo.public_id);

  await Product.updateMany({ post: req.params.id }, { $unset: { post: "" } });
  await User.findByIdAndUpdate(post.creator, {
    $unset: { post: "" },
  });

  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "Post deleted successfully",
  });
};
