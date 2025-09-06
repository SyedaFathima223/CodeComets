const express = require('express');
const { protect } = require('../middleware/auth');
const messageController = require('../controllers/message.controller');

const router = express.Router();

router.post('/', protect, messageController.sendMessage);
router.get('/', protect, messageController.getMessages);
router.get('/:id', protect, messageController.getMessageById);

module.exports = router;
