const express = require("express");
const User = require("../Models/userModel.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware.js");
require("dotenv").config();
const SECRET_KEY = process.env.JWT_SECRET;
// POST /api/v1/users - Create new user
router.post("/register", async (req, res) => {
  try {
    const { username, password, firstName, lastName } = req.body;
    //Check for existing user
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists!" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      password: hashedPassword,
      firstName,
      lastName,
    });

    // Create JWT token
    const token = jwt.sign(
      { id: newUser._id, username: newUser.username },
      SECRET_KEY,
      { expiresIn: "1h" } // token expires in 1 hour
    );

    await newUser.save();

    res.status(201).json({
      message: "✅ User registered successfully!",
      user: {
        id: newUser._id,
        username: newUser.username,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
      },
      token,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "❌ Failed to create user", details: error.message });
  }
});

//Post for login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    // 1️ Check if user exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: "User not found!" });
    }

    // 2️ Compare entered password with hashed password in DB
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials!" });
    }

    // 3️ Generate JWT token
    const token = jwt.sign(
      { id: user._id, username: user.username },
      SECRET_KEY,
      { expiresIn: "1h" }
    );

    // 4️ Send success response
    res.status(200).json({
      message: "✅ Login successful!",
      user: {
        id: user._id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
      },
      token,
    });
  } catch (error) {
    return res.status(500).json({
      error: "❌ Login failed!",
      details: error.message,
    });
  }
});

//PatchApi : To update information

router.patch("/edit", authMiddleware, async (req, res) => {
  try {
    const { userId, newUsername } = req.body;

    // 1️⃣ Validate input
    if (!userId || !newUsername) {
      return res.status(400).json({
        error: "userId and newUsername are required",
      });
    }

    // 2️⃣ Update user in DB
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { username: newUsername },
      { new: true } // return updated updated document
    );

    if (!updatedUser) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    // 3️⃣ Success response
    res.status(200).json({
      message: "Username updated successfully!",
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update username",
      error: error.message,
    });
  }
});

//Get api to fetch user details
router.get("/bulk", authMiddleware, async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json({ users });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch users", details: error.message });
  }
});
module.exports = router;
