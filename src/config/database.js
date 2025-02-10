const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/practice", {
      serverSelectionTimeoutMS: 10000, // Set timeout to 10 seconds
    });
    console.log("✅ Connected to MongoDB");
  } catch (err) {
    console.error("❌ MongoDB Connection Failed:", err.message);
    process.exit(1); // Stop the server if connection fails
  }
};

module.exports = connectDB;
