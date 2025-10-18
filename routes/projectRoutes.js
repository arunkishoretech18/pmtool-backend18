import express from "express";
import { getTasksByProject } from "../controllers/taskController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Get all tasks for a specific project
router.get("/:projectId/tasks", authMiddleware, getTasksByProject);

export default router;