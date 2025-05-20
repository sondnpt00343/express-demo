const express = require("express");
const usersController = require("@/controllers/admin/users.controller");

const router = express.Router();

router.get("/", usersController.index);
router.get("/:id", usersController.show);

module.exports = router;
