import express from 'express';
import Task from '../src/module/Task.js';

const router = express.Router();

// Create a new Task
router.post('/', async (req, res) => {
  try {
    const task = await Task.createTask(req.body);
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get tasks by project ID
router.get('/', async (req, res) => {
  const projectId = req.query.project_id;
  try {
    const tasks = await Task.getTasksByProject(projectId);
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
