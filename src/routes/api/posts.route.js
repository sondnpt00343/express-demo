const express = require("express");
const postsController = require("@/controllers/api/posts.controller");
const postsValidator = require("@/validators/posts.validator");

const router = express.Router();

// Posts
router.get("/", postsController.getAllPosts);
router.get("/:id", postsController.getPostById);
router.post("/", postsValidator.createPost, postsController.createPost);
router.put("/:id", postsValidator.updatePost, postsController.updatePost);
router.patch("/:id", postsValidator.updatePost, postsController.updatePost);
router.delete("/:id", postsController.deletePost);

// Post comments
router.get("/:id/comments", postsController.getPostComments);
router.post("/:id/comments", postsController.createPostComments);

module.exports = router;
