const express = require("express");
const authController = require("@/controllers/admin/auth.controller");

const router = express.Router();

router.get("/register", authController.showRegisterForm);
router.post("/register", authController.register);

router.get("/login", authController.showLoginForm);
router.post("/login", authController.login);

router.delete("/logout", authController.logout);

module.exports = router;
