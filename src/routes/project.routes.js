const express = require('express');
const { protect } = require('../middleware/auth');
const projectController = require('../controllers/project.controller');

const router = express.Router();

router.post('/', protect, projectController.createProject);
router.get('/', protect, projectController.getProjects);
router.get('/:id', protect, projectController.getProjectById);
router.put('/:id', protect, projectController.updateProject);
router.delete('/:id', protect, projectController.deleteProject);

module.exports = router;
