const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const User = require("../models/userModel");
const HttpError = require("../models/errorModel");
const { generateToken } = require("../utils/generateToken");
const {
  verificationEmail,
  welcomeEmail,
  resetPasswordEmail,
  resetSuccessEmail,
} = require("../mailtrap/emails");

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

    await verificationEmail(user.email, verificationToken);

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

// Verify Email
async function verifyEmail(req, res, next) {
  try {
    const { code } = req.body;

    const user = await User.findOne({
      verificationToken: code,
      verificationTokenExpiresAt: { $gt: Date.now() },
    });

    if (!user) {
      return next(
        new HttpError("유효하지 않거나 만료된 인증 코드입니다.", 400)
      );
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;
    await user.save();

    await welcomeEmail(user.email, user.name);

    res.status(200).json({
      success: true,
      message: "이메일 인증이 완료되었습니다.",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    return next(new HttpError("사용자 이메일 인증에 실패하였습니다.", 400));
  }
}

// Login
async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    const newEmail = email.toLowerCase();

    const user = await User.findOne({ email: newEmail });
    if (!user) {
      return next(new HttpError("잘못된 이메일주소입니다.", 400));
    }

    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
      return next(new HttpError("잘못된 비밀번호입니다.", 400));
    }

    generateToken(res, user._id);

    user.lastLogin = new Date();

    res.status(200).json({
      success: true,
      message: "로그인 되었습니다.",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    new HttpError("로그인에 실패했습니다. 계정을 다시 확인해 주세요.", 400);
  }
}

// Logout
async function logout(req, res, next) {
  res.clearCookie("token");
  res.status(200).json({ success: true, message: "로그아웃 되었습니다." });
}

// Forgot Password
async function forgotPassword(req, res, next) {
  try {
    const { email } = req.body;

    const newEmail = email.toLowerCase();

    const user = await User.findOne({ email: newEmail });
    if (!user) {
      return next(new HttpError("잘못된 이메일주소입니다.", 400));
    }

    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000; // 1 hour

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpiresAt = resetTokenExpiresAt;

    await user.save();

    await resetPasswordEmail(
      user.email,
      `${process.env.FRONTEND_URL}/reset-password/${resetToken}`
    );

    res.status(200).json({
      success: true,
      message: "비밀번호 재설정 메일이 발송되었습니다.",
    });
  } catch (error) {
    new HttpError("비밀번호 재설정 메일 발송에 실패하였습니다.", 400);
  }
}

// Reset Password
async function resetPassword(req, res, next) {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpiresAt: { $gt: Date.now() },
    });

    if (!user) {
      return next(
        new HttpError("유효하지 않거나 만료된 재설정 토큰입니다.", 400)
      );
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiresAt = undefined;
    await user.save();

    await resetSuccessEmail(user.email);

    res.status(200).json({
      success: true,
      message: "비밀번호 재설정이 완료되었습니다.",
    });
  } catch (error) {
    new HttpError("비밀번호 재설정에 실패하였습니다.", 400);
  }
}

module.exports = {
  register,
  login,
  logout,
  verifyEmail,
  forgotPassword,
  resetPassword,
};
