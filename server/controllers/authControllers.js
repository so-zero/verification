const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const HttpError = require("../models/errorModel");
const { generateToken } = require("../utils/generateToken");

// Register
async function register(req, res, next) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return next(new HttpError("모든 필드를 입력해 주세요.", 400));
    }

    const newEmail = email.toLowerCase();

    const emailExists = await User.findOne({ email: newEmail });
    if (emailExists) {
      return next(new HttpError("이메일이 존재합니다.", 400));
    }

    const salt = await bcrypt.genSalt(10);
    const verificationToken = Math.floor(
      100000 + Math.random() * 900000
    ).toString();
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = new User({
      name,
      email,
      password: hashedPassword,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
    });

    await user.save();

    generateToken(res, user._id);

    res.status(201).json({
      success: true,
      message: "회원가입이 완료되었습니다.",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    return next(new HttpError("사용자 등록에 실패하였습니다.", 400));
  }
}
async function login(req, res, next) {}
async function logout(req, res, next) {}

module.exports = { register, login, logout };
