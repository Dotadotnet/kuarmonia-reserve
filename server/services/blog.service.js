

/* internal import */
const Blog = require("../models/blog.model");
const Product = require("../models/product.model");
const User = require("../models/user.model");
const remove = require("../utils/remove.util");
const Category = require("../models/category.model");

/* add new blog */
exports.addBlog = async (req, res) => {
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
  const blog = await Blog.create({
    ...otherInformation,
    creator: req.user._id,
    thumbnail,
    gallery,  
    tags:parsedTags,
    socialLinks:parsedSocialLinks

  });
  await Category.findByIdAndUpdate(blog.category, {
    $push: { blogs: blog._id },
  });


  res.status(201).json({
    acknowledgement: true,
    message: "Created",
    description: "پست  با موفقیت ایجاد شد",
  });
};

/* get all blogs */
exports.getBlogs = async (res) => {

  const blogs = await Blog.find()
  .select('title description publishDate createdAt thumbnail creator category') 
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
    data: blogs,
  });
};

/* get a blog */
exports.getBlog = async (req, res) => {
  const blog = await Blog.findById(req.params.id).populate([
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
    description: "Blog fetched successfully",
    data: blog,
  });
};

/* update blog */
exports.updateBlog = async (req, res) => {
  let updatedBlog = req.body;
  await Blog.findByIdAndUpdate(req.params.id, updatedBlog);
  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "Blog updated successfully",
  });
};

/* delete blog */
exports.deleteBlog = async (req, res) => {
  const blog = await Blog.findByIdAndDelete(req.params.id);
  await remove(blog.logo.public_id);

  await Product.updateMany({ blog: req.params.id }, { $unset: { blog: "" } });
  await User.findByIdAndUpdate(blog.creator, {
    $unset: { blog: "" },
  });

  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "Blog deleted successfully",
  });
};
