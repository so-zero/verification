const jwt = require("jsonwebtoken");
const HttpError = require("../models/errorModel");

const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;
  try {
    if (!token) {
      return next(new HttpError("토큰이 존재하지 않습니다.", 400));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return next(new HttpError("토큰이 존재하지 않습니다.", 400));
    }

    req.userId = decoded.userId;
    next();
  } catch (error) {
    return next(new HttpError(error));
  }
};

module.exports = authMiddleware;
