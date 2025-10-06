import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { createServer } from "http";
import { Server } from "socket.io";

import authRoutes from "./routes/authRoutes.js"; // Import your authRoutes correctly
import authMiddleware from "./middleware/authMiddleware.js";

dotenv.config();

const app = express();
const httpServer = createServer(app);

// Socket.io server attached to HTTP server with CORS enabled
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// Socket.io connection handler
io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 5000;

console.log("Current server working directory:", process.cwd());
console.log("DEBUG: Imported authRoutes =", authRoutes);

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Atlas Connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Middleware
app.use(cors());
app.use(express.json());

// Protected test route
app.get("/api/protected", authMiddleware, (req, res) => {
  res.json({ message: "Access granted", userId: req.user.id });
});

// Routes
app.get("/test", (req, res) => res.send("Test route works"));
app.get("/", (req, res) => res.send("Backend is running"));
app.use("/api/auth", authRoutes);

// Test register route
app.post("/api/auth/register-test", (req, res) => {
  res.send("register-test works");
});

// General 404 handler
app.use((req, res) => {
  res.status(404).type("text/html").send("404 Not Found");
});

// Start the HTTP + Socket.io server
httpServer.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
