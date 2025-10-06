import express from 'express';
import Project from '../src/module/Project.js';

const router = express.Router();

// Create a new Project
router.post('/', async (req, res) => {
  try {
    const project = await Project.createProject(req.body);
    res.status(201).json(project);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get projects by user ID
router.get('/', async (req, res) => {
  const userId = req.query.user_id;
  try {
    const projects = await Project.getProjectsByUser(userId);
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
