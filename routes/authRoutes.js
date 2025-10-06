// routes/authRoutes.js
console.log("=== authRoutes.js is loaded! ===");

import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();


// ========== REGISTER ROUTE ==========


router.post("/register", async (req, res) => {
  console.log("Request body:", req.body);
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const normalizedEmail = email.toLowerCase();

    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return res.status(400).json({ error: "Email already registered." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email: normalizedEmail, password: hashedPassword });
    await user.save();

    console.log("User saved:", user);

    return res.status(201).json({ message: "User registered successfully." });
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({ error: "Server error" });
  }
});
// ========== LOGIN ROUTE ==========
router.post("/login", async (req, res) => {
  console.log("📥 Incoming login request body:", req.body);

  try {
    const { email, password } = req.body;

    if (!email || !password) {
      console.log("❌ Missing email or password");
      return res.status(400).json({ error: "Email and password are required" });
    }

    const normalizedEmail = email.toLowerCase();
    const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      console.log("❌ No user found for email:", normalizedEmail);
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("❌ Incorrect password for:", normalizedEmail);
      return res.status(400).json({ error: "Invalid email or password" });
    }

    if (!process.env.JWT_SECRET) {
      console.error("❌ Missing JWT_SECRET in environment variables");
      return res.status(500).json({ error: "Server misconfiguration" });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    console.log("✅ Login successful. Token generated for:", normalizedEmail);

    return res.status(200).json({
      message: "Login successful",
      token,
      user: { id: user._id, email: user.email },
    });

  } catch (error) {
    console.error("💥 Login error:", error);
    return res.status(500).json({ error: "Server error" });
  }
});

// Ensure the router is exported correctly!
export default router;
