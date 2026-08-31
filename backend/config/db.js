const mongoose = require("mongoose");

const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI;

  if (mongoUri) {
    try {
      await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 2000 });
      console.log("MongoDB connected:", mongoUri);
      return;
    } catch (error) {
      console.warn("Local MongoDB connection timed out:", error.message);
      console.log("Starting embedded MongoMemoryServer fallback...");
    }
  }

  try {
    const { MongoMemoryServer } = require("mongodb-memory-server");
    const mongod = await MongoMemoryServer.create({
      binary: { version: "7.0.14" }
    });
    const uri = mongod.getUri();
    await mongoose.connect(uri);
    console.log("Embedded MongoDB connected successfully at:", uri);
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err.message);
    console.warn("Starting server without active database connection.");
  }
};

module.exports = connectDB;

