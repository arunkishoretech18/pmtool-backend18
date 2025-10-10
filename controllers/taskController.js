import Task from '../src/module/Task.js';

// Create a new task
export const createTask = async (req, res) => {
  try {
    const { title, description, status, dueDate, projectId } = req.body;
    const createdBy = req.user ? req.user.id : null; // Assumes auth middleware sets req.user

    if (!title || !projectId) {
      return res.status(400).json({ message: 'Title and Project ID are required.' });
    }

    const newTask = new Task({
      title,
      description,
      status,
      dueDate,
      project_id: projectId,
      user_id: createdBy, 
    });

    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};
