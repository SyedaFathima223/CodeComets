const express = require('express');
const { protect } = require('../middleware/auth');
const notificationController = require('../controllers/notification.controller');

const router = express.Router();

router.get('/', protect, notificationController.getNotifications);
router.put('/:id/read', protect, notificationController.markAsRead);

module.exports = router;
