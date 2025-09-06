const Notification = require('../models/Notification'); // need Notification model

exports.getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ user: req.user.id });
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.markAsRead = async (req, res) => {
  try {
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );
    if (!notification) return res.status(404).json({ message: 'Not found' });
    res.json(notification);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
