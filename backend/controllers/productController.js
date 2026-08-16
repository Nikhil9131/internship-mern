const Product = require("../models/Product");
const APIFeatures = require("../utils/apiFeatures");
const asyncHandler = require("../middleware/asyncHandler");
const AppError = require("../utils/AppError");

// ================= CREATE PRODUCT =================
const createProduct = asyncHandler(async (req, res, next) => {
  const {
    name,
    description,
    price,
    category,
    stock,
    image,
  } = req.body;

  const product = await Product.create({
    name,
    description,
    price,
    category,
    stock,
    image,
    createdBy: req.user._id,
  });

  res.status(201).json({
    success: true,
    message: "Product Created Successfully",
    product,
  });
});

// ================= GET ALL PRODUCTS =================
const getProducts = asyncHandler(async (req, res) => {
  const defaultLimit = 5;

  // Build search + filter
  const apiFeatures = new APIFeatures(
    Product.find(),
    req.query
  )
    .search()
    .filter();

  // Count AFTER search/filter but BEFORE pagination
  const filteredCount = await Product.countDocuments(
    apiFeatures.query.getFilter()
  );

  // Get actual page and limit
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || defaultLimit;

  // Sort + pagination + field limiting
  apiFeatures
    .sort()
    .paginate(defaultLimit)
    .limitFields();

  const products = await apiFeatures.query;

  res.status(200).json({
    success: true,
    count: products.length,
    total: filteredCount,
    page,
    limit,
    pages: Math.ceil(filteredCount / limit),
    products,
  });
});
// ================= GET PRODUCT BY ID =================
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    throw new AppError(
      "Product not found",
      404
    );
  }

  res.status(200).json({
    success: true,
    product,
  });
});

// ================= UPDATE PRODUCT =================

const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!product) {
    throw new AppError(
      "Product not found",
      404
    );
  }

  res.status(200).json({
    success: true,
    message: "Product updated",
    product,
  });
});

// ================= DELETE PRODUCT =================

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(
    req.params.id
  );

  if (!product) {
    throw new AppError(
      "Product not found",
      404
    );
  }

  await product.deleteOne();

  res.status(200).json({
    success: true,
    message: "Product deleted",
  });
});

// ================= EXPORT =================
module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};