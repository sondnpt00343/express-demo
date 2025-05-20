const express = require("express");
const authController = require("../controllers/auth.controller");

const router = express.Router();

router.get("/me", authController.getCurrentUser);
router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/refresh-token", authController.refreshToken);

module.exports = router;
