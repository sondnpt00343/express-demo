const express = require("express");
const usersController = require("@/controllers/admin/users.controller");
const userValidators = require("@/validators/admin/users.validator");

const router = express.Router();

router.get("/", usersController.index);
router.post("/", userValidators.createUser, usersController.store);
router.get("/create", usersController.create);
router.get("/:id/edit", usersController.edit);
router.get("/:id", usersController.show);
router.patch("/:id", usersController.update);

module.exports = router;
