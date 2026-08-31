const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");

const connectDB = require("./config/db");

const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const inquiryRoutes = require("./routes/inquiryRoutes");

const errorHandler = require("./middleware/errorMiddleware");
const {
  apiLimiter,
} = require("./middleware/rateLimiter");

// ================= ENVIRONMENT =================

dotenv.config({
  path: path.join(__dirname, ".env"),
});

const env = require("./config/env");

// ================= APP =================

const app = express();

// ================= MIDDLEWARE =================

app.use(helmet());
app.use(cors());
app.use(
  express.json({
    limit: "10kb",
  })
);

// General API rate limit
app.use("/api", apiLimiter);

// ================= TEST ROUTE =================

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API is running",
  });
});

// ================= ROUTES =================

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/inquiries", inquiryRoutes);

// ================= ERROR HANDLER =================

// MUST BE LAST
app.use(errorHandler);

// ================= PORT =================

const PORT = env.PORT;

// ================= START SERVER =================

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// ================= DATABASE =================

connectDB()
  .then(() => {
    console.log("Database ready");
  })
  .catch((error) => {
    console.error("Failed to connect to database:", error.message);
  });