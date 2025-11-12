const mongoose = require("mongoose");

const mongoURI = "mongodb+srv://monoperson948:oaD7ted4jl1rGL7e@cluster0.4snkggy.mongodb.net/Paytm";

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB connected successfully!");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
    process.exit(1); // stop the app if DB fails
  }
};

module.exports = connectDB;
