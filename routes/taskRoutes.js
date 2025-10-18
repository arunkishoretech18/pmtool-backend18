import express from "express";
import { createTask, getTasksByProject, updateTaskStatus, getAllTasks, getTasksByUserId, getTaskById } from "../controllers/taskController.js";

const router = express.Router(); // Initialize router before use

router.post("/tasks", createTask);
router.get("/projects/:projectId/tasks", getTasksByProject);
router.patch("/tasks/:taskId/status", updateTaskStatus);
router.get("/tasks", getAllTasks);
router.get("/users/:userId/tasks", getTasksByUserId);
router.get("/tasks/:taskId", getTaskById);

export default router; // Export the router