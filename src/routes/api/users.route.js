const express = require("express");
const usersController = require("@/controllers/api/users.controller");

const router = express.Router();

router.get("/", usersController.getList);
router.get("/:id/email-image.jpg", usersController.getEmailImage);
router.get("/:id", usersController.getOne);
router.post("/", usersController.create);
router.put("/:id", usersController.update);
router.patch("/:id", usersController.update);
router.delete("/:id", usersController.remove);

module.exports = router;
