const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log("MongoDB Connected");
  } catch (err) {
    console.error(" Not connected to MongoDB:", err.message);
    process.exit(1); // Stop the app if DB connection fails
  }
};

module.exports = connectDB;
