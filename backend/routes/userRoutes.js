const express = require("express");
const router = express.Router();

// ================= MIDDLEWARE =================

const {
  protect,
  admin,
} = require("../middleware/authMiddleware");

const validate = require("../middleware/validate");

const {
  authLimiter,
} = require("../middleware/rateLimiter");

// ================= VALIDATORS =================

const {
  registerUserSchema,
  loginUserSchema,
  updateUserSchema,
} = require("../validators/userValidator");

// ================= CONTROLLERS =================

const {
  registerUser,
  loginUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

// ==================================================
// PUBLIC ROUTES
// ==================================================

router.post(
  "/register",
  authLimiter,
  validate(registerUserSchema),
  registerUser
);

router.post(
  "/login",
  authLimiter,
  validate(loginUserSchema),
  loginUser
);

// ==================================================
// LOGGED-IN USER
// ==================================================

router.get(
  "/profile",
  protect,
  (req, res) => {
    res.status(200).json({
      success: true,
      user: req.user,
    });
  }
);

// ==================================================
// ADMIN ROUTES
// ==================================================

// Get all users
router.get(
  "/",
  protect,
  admin,
  getUsers
);

// Get single user
router.get(
  "/:id",
  protect,
  admin,
  getUserById
);

// Update user
router.put(
  "/:id",
  protect,
  admin,
  validate(updateUserSchema),
  updateUser
);

// Delete user
router.delete(
  "/:id",
  protect,
  admin,
  deleteUser
);

// Admin test
router.get(
  "/admin",
  protect,
  admin,
  (req, res) => {
    res.status(200).json({
      success: true,
      message: "Welcome Admin",
    });
  }
);

module.exports = router;