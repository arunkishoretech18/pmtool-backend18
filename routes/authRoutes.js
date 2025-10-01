import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }
  if (password.length < 8 ||
      !/[A-Z]/.test(password) ||
      !/[a-z]/.test(password) ||
      !/[0-9]/.test(password) ||
      !/[^A-Za-z0-9]/.test(password)) {
    return res.status(400).json({ error: "Password must be 8+ chars, include upper/lowercase, a number, and a symbol." });
  }

  // Check duplicate email
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ error: "Email already registered." });
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Save new user
  const user = new User({ email, password: hashedPassword });
  await user.save();

  return res.status(201).json({ message: "User registered successfully." });
});

export default router;
