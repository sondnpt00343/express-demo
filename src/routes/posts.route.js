const express = require("express");
const postsController = require("../controllers/posts.controller");
const postsValidator = require("../validators/posts.validator");

const router = express.Router();

router.get("/", postsController.getAllPosts);
router.get("/:id", postsController.getPostById);
router.post("/", postsValidator.createPost, postsController.createPost);
router.put("/:id", postsValidator.updatePost, postsController.updatePost);
router.patch("/:id", postsValidator.updatePost, postsController.updatePost);
router.delete("/:id", postsController.deletePost);

module.exports = router;
