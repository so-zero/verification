const express = require("express");
const {
  register,
  login,
  logout,
  verifyEmail,
  forgotPassword,
} = require("../controllers/authControllers");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

router.post("/verify-email", verifyEmail);
router.post("/forgot-password", forgotPassword);

module.exports = router;
