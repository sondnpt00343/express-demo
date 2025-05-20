const postsService = require("@/services/posts.service");
const commentsService = require("@/services/comments.service");
const { success } = require("@/utils/response");
const throwError = require("@/utils/throwError");

exports.getAllPosts = async (req, res) => {
    const posts = await postsService.getAllPosts();
    success(res, 200, posts);
};

exports.getPostById = async (req, res) => {
    const post = await postsService.getPostById(req.params.id);
    if (!post) throwError(404, "Not found.");
    const comments = await commentsService.getCommentsByPostId(post.id);
    const response = {
        ...post,
        comments,
    };
    success(res, 200, response);
};

exports.createPost = async (req, res) => {
    const post = await postsService.createPost(req.body);
    success(res, 201, post);
};

exports.updatePost = async (req, res) => {
    const post = await postsService.updatePost(req.params.id, req.body);
    if (!post) throwError(404, "Not found.");
    success(res, 200, post);
};

exports.deletePost = async (req, res) => {
    const result = await postsService.deletePost(req.params.id);
    if (!result) throwError(404, "Not found.");

    res.status(204).send();
};

exports.getPostComments = async (req, res) => {
    const post = await postsService.getPostById(req.params.id);
    if (!post) throwError(404, "Not found.");

    const comments = await commentsService.getCommentsByPostId(post.id);
    success(res, 200, comments);
};

exports.createPostComments = async (req, res) => {
    const post = await postsService.getPostById(req.params.id);
    if (!post) throwError(404, "Not found.");

    const newComment = await commentsService.createComment({
        post_id: post.id,
        content: req.body.content,
    });
    success(res, 201, newComment);
};
