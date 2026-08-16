const jwt = require("jsonwebtoken");
const User = require("../models/User");
const AppError = require("../utils/AppError");

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(
      new AppError(
        "Not authorized. No token provided.",
        401
      )
    );
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    const user = await User.findById(decoded.id)
      .select("-password");

    if (!user) {
      return next(
        new AppError(
          "User no longer exists.",
          401
        )
      );
    }

    req.user = user;

console.log("AUTH USER:", {
  id: user._id.toString(),
  email: user.email,
  role: user.role,
});

next();

  } catch (error) {
    return next(
      new AppError(
        "Invalid or expired token.",
        401
      )
    );
  }
};

// ================= ADMIN =================

const admin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: "Not authorized",
    });
  }

  if (req.user.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Admin access only",
    });
  }

  next();
};
module.exports = {
  protect,
  admin,
};