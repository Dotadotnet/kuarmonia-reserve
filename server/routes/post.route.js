

/* external import */
const express = require("express");

/* middleware imports */
const upload = require("../middleware/upload.middleware");

/* internal import */
const postController = require("../controllers/post.controller");
const verify = require("../middleware/verify.middleware");
const authorize = require("../middleware/authorize.middleware");

/* router level connection */
const router = express.Router();

/* router methods integration */

// add new post
router.post(
  "/add-post",
  verify,
  authorize("superAdmin", "admin"),
  upload('post').fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "gallery", maxCount: 10 },
  ]),
  postController.addPost
);

// get all posts
router.get("/get-posts", postController.getPosts);

// get a post
router.get("/get-post/:id", postController.getPost);

// update post
router.patch(
  "/update-post/:id",
  verify,
  authorize("superAdmin", "admin"),
  upload('post').single("logo"),
  postController.updatePost
);

// delete post
router.delete(
  "/delete-post/:id",
  verify,
  authorize("superAdmin", "admin"),
  postController.deletePost
);

module.exports = router;
