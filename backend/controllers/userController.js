const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const asyncHandler = require("../middleware/asyncHandler");
const AppError = require("../utils/AppError");

// ================= REGISTER USER =================

const registerUser = asyncHandler(async (req, res) => {
  const {
    name,
    email,
    password,
  } = req.body;

  const normalizedEmail = email.toLowerCase();

  const existingUser = await User.findOne({
    email: normalizedEmail,
  });

  if (existingUser) {
    throw new AppError(
      "User already exists",
      409
    );
  }

  const hashedPassword = await bcrypt.hash(
    password,
    10
  );

  const adminEmails = [
    "nikhilrathore@gmail.com",
    "nikhilrathore10b@gmail.com",
    ...(process.env.ADMIN_EMAIL ? process.env.ADMIN_EMAIL.toLowerCase().split(",") : [])
  ];

  const role = adminEmails.includes(normalizedEmail) ? "admin" : "user";

  const user = await User.create({
    name,
    email: normalizedEmail,
    password: hashedPassword,
    role,
  });

  res.status(201).json({
    success: true,
    message: "User Registered Successfully",
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});

// ================= LOGIN USER =================

const loginUser = asyncHandler(async (req, res) => {
  const {
    email,
    password,
  } = req.body;

  const normalizedEmail = email.toLowerCase();

  // Password is select:false in User model,
  // so explicitly include it for login.
  const user = await User.findOne({
    email: normalizedEmail,
  }).select("+password");

  if (!user) {
    throw new AppError(
      "Invalid email or password",
      401
    );
  }

  const isMatch = await bcrypt.compare(
    password,
    user.password
  );

  if (!isMatch) {
    throw new AppError(
      "Invalid email or password",
      401
    );
  }

  const adminEmails = [
    "nikhilrathore@gmail.com",
    "nikhilrathore10b@gmail.com",
    ...(process.env.ADMIN_EMAIL ? process.env.ADMIN_EMAIL.toLowerCase().split(",") : [])
  ];

  if (adminEmails.includes(normalizedEmail) && user.role !== "admin") {
    user.role = "admin";
    await user.save();
  }

  const token = jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );

  res.status(200).json({
    success: true,
    message: "Login Successful",
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});

// ================= GET ALL USERS =================

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find()
    .select("-password -__v")
    .sort("-createdAt");

  res.status(200).json({
    success: true,
    count: users.length,
    users,
  });
});

// ================= GET USER BY ID =================

const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(
    req.params.id
  ).select("-password -__v");

  if (!user) {
    throw new AppError(
      "User not found",
      404
    );
  }

  res.status(200).json({
    success: true,
    user,
  });
});

// ================= UPDATE USER =================

const updateUser = asyncHandler(async (req, res) => {
  const {
    name,
    email,
    role,
  } = req.body;

  const updateData = {};

  if (name !== undefined) {
    updateData.name = name;
  }

  if (email !== undefined) {
    updateData.email = email.toLowerCase();
  }

  if (role !== undefined) {
    updateData.role = role;
  }

  const user = await User.findByIdAndUpdate(
    req.params.id,
    updateData,
    {
      new: true,
      runValidators: true,
    }
  ).select("-password -__v");

  if (!user) {
    throw new AppError(
      "User not found",
      404
    );
  }

  res.status(200).json({
    success: true,
    message: "User updated successfully",
    user,
  });
});

// ================= DELETE USER =================

const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(
    req.params.id
  );

  if (!user) {
    throw new AppError(
      "User not found",
      404
    );
  }

  await user.deleteOne();

  res.status(200).json({
    success: true,
    message: "User deleted successfully",
  });
});

// ================= EXPORT =================

module.exports = {
  registerUser,
  loginUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};