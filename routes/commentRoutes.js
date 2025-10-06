import express from 'express';
import Comment from '../src/module/Comment.js';

const router = express.Router();

// Create a new Comment
router.post('/', async (req, res) => {
  try {
    const comment = await Comment.createComment(req.body);
    res.status(201).json(comment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get comments by task ID
router.get('/', async (req, res) => {
  const taskId = req.query.task_id;
  try {
    const comments = await Comment.getCommentsByTask(taskId);
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
