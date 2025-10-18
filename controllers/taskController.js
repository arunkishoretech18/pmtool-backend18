import Task from "../src/module/Task.js";
import mongoose from "mongoose";

export const createTask = async (req, res) => {
  try {
    const { title, description, status, dueDate, projectId } = req.body;
    const userId = req.user.id;

    if (!title || !projectId) {
      return res.status(400).json({ message: "Title and Project ID are required." });
    }

    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      return res.status(400).json({ message: "Invalid Project ID." });
    }

    // Create new task
    const newTask = new Task({
      title,
      description,
      status: status || "To Do", // Default to "To Do" if not provided
      dueDate,
      project_id: projectId, // Match backend field name
      user_id: userId,
    });

    const savedTask = await newTask.save();
    return res.status(201).json(savedTask);
  } catch (error) {
    console.error("[CREATE Task] Error:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getTasksByProject = async (req, res) => {
  try {
    const { projectId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      return res.status(400).json({ message: "Invalid Project ID." });
    }

    const tasks = await Task.find({ project_id: new mongoose.Types.ObjectId(projectId) })
      .populate("user_id", "name email")
      .sort({ createdAt: -1 });

    if (!tasks.length) {
      return res.status(404).json({ message: "No tasks found for this project." });
    }

    return res.status(200).json(tasks);
  } catch (error) {
    console.error("[GET Tasks] Error:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const updateTaskStatus = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { status } = req.body;
    const userId = req.user.id;

    if (!mongoose.Types.ObjectId.isValid(taskId)) {
      return res.status(400).json({ message: "Invalid Task ID." });
    }

    if (!["To Do", "In Progress", "Done"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value." });
    }

    const updatedTask = await Task.findOneAndUpdate(
      { _id: taskId, user_id: userId },
      { status },
      { new: true, runValidators: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found or unauthorized." });
    }

    return res.status(200).json(updatedTask);
  } catch (error) {
    console.error("[UPDATE Task Status] Error:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find()
      .populate("user_id", "name email")
      .sort({ createdAt: -1 });
    if (!tasks.length) {
      return res.status(404).json({ message: "No tasks found." });
    }
    return res.status(200).json(tasks);
  } catch (error) {
    console.error("[GET All Tasks] Error:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getTasksByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid User ID." });
    }

    const tasks = await Task.find({ user_id: new mongoose.Types.ObjectId(userId) })
      .populate("user_id", "name email")
      .sort({ createdAt: -1 });

    if (!tasks.length) {
      return res.status(404).json({ message: "No tasks found for this user." });
    }

    return res.status(200).json(tasks);
  } catch (error) {
    console.error("[GET Tasks by User] Error:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getTaskById = async (req, res) => {
  try {
    const { taskId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(taskId)) {
      return res.status(400).json({ message: "Invalid Task ID." });
    }

    const task = await Task.findById(taskId).populate("user_id", "name email");

    if (!task) {
      return res.status(404).json({ message: "Task not found." });
    }

    return res.status(200).json(task);
  } catch (error) {
    console.error("[GET Task by ID] Error:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};