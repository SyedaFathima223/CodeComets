const express = require('express');
const { protect } = require('../middleware/auth');
const taskController = require('../controllers/task.controller');

const router = express.Router();

router.post('/', protect, taskController.createTask);
router.get('/', protect, taskController.getTasks);
router.get('/:id', protect, taskController.getTaskById);
router.put('/:id', protect, taskController.updateTask);
router.delete('/:id', protect, taskController.deleteTask);

module.exports = router;
