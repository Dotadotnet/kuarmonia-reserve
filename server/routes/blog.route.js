

/* external import */
const express = require("express");

/* middleware imports */
const upload = require("../middleware/upload.middleware");

/* internal import */
const blogController = require("../controllers/blog.controller");
const verify = require("../middleware/verify.middleware");
const authorize = require("../middleware/authorize.middleware");

/* router level connection */
const router = express.Router();

/* router methods integration */

// add new blog
router.post(
  "/add-blog",
  verify,
  authorize("superAdmin", "admin"),
  upload('blog').fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "gallery", maxCount: 10 },
  ]),
  blogController.addBlog
);

// get all blogs
router.get("/get-blogs", blogController.getBlogs);

// get a blog
router.get("/get-blog/:id", blogController.getBlog);

// update blog
router.patch(
  "/update-blog/:id",
  verify,
  authorize("superAdmin", "admin"),
  upload('blog').single("logo"),
  blogController.updateBlog
);

// delete blog
router.delete(
  "/delete-blog/:id",
  verify,
  authorize("superAdmin", "admin"),
  blogController.deleteBlog
);

module.exports = router;
