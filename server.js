import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes.js";  // Import your authRoutes correctly
import authMiddleware from "./middleware/authMiddleware.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

console.log("Current server working directory:", process.cwd());
console.log("DEBUG: Imported authRoutes =", authRoutes); // Should log router object

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Atlas Connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// Middleware
app.get("/api/protected", authMiddleware, (req, res) => {
  res.json({ message: "Access granted", userId: req.user.id });
});

app.use(cors());
app.use(express.json());

// Routes
app.get("/test", (req, res) => res.send("Test route works"));
app.get("/", (req, res) => res.send("Backend is running"));
app.use("/api/auth", authRoutes);

// Add a test POST route to verify route mounting
app.post('/api/auth/register-test', (req, res) => {
  res.send('register-test works');
});

// General 404 handler (no path prefix!) - catch all unmatched routes
app.use((req, res) => {
  res.status(404).type("text/html").send("404 Not Found");
});

// Start server
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
