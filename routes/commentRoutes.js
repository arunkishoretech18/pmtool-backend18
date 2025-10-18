import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Placeholder for creating a new comment (requires controller implementation)
router.post("/", authMiddleware, (req, res) => {
  res.status(501).json({ message: "Comment creation not implemented. Create a controller first." });
});

// Placeholder for getting comments by task (requires controller implementation)
router.get("/task/:taskId", authMiddleware, (req, res) => {
  res.status(501).json({ message: "Comment retrieval not implemented. Create a controller first." });
});

export default router;