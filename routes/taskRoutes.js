import express from 'express';
import { createTask } from '../controllers/taskController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// POST /api/tasks
router.post('/', authMiddleware, createTask);

export default router;
