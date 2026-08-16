const express = require("express");
const router = express.Router();

const { protect, admin } = require("../middleware/authMiddleware");
const validate = require("../middleware/validate");

const {
  createProductSchema,
  updateProductSchema,
} = require("../validators/productValidator");

const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

// ===============================
// GET ALL PRODUCTS
// Public
// ===============================
router.get("/", getProducts);

// ===============================
// CREATE PRODUCT
// Admin only
// ===============================
router.post(
  "/",
  protect,
  admin,
  validate(createProductSchema),
  createProduct
);

// ===============================
// GET PRODUCT BY ID
// Public
// ===============================
router.get("/:id", getProductById);

// ===============================
// UPDATE PRODUCT
// Admin only
// ===============================
router.put(
  "/:id",
  protect,
  admin,
  validate(updateProductSchema),
  updateProduct
);

// ===============================
// DELETE PRODUCT
// Admin only
// ===============================
router.delete(
  "/:id",
  protect,
  admin,
  deleteProduct
);

module.exports = router;