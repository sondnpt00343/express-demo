const express = require("express");
const usersRouter = require("./users.route");
const authRouter = require("./auth.route");

const router = express.Router();

router.use("/users", usersRouter);
router.use("/", authRouter);

module.exports = router;
