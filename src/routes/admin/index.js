const express = require("express");
const usersRouter = require("./users.route");

const router = express.Router();

router.use("/users", usersRouter);

module.exports = router;
