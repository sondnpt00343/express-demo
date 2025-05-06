const express = require("express");
const authRouter = require("./auth.route");
const postsRouter = require("./posts.route");

const router = express.Router();

router.use("/auth", authRouter);
router.use("/posts", postsRouter);

module.exports = router;
