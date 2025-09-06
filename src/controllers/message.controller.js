const Message = require('../models/Message'); // need Message model

exports.sendMessage = async (req, res) => {
  try {
    const message = await Message.create({ ...req.body, sender: req.user.id });
    res.status(201).json(message);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.find({}).populate('sender', 'email');
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getMessageById = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id).populate('sender', 'email');
    if (!message) return res.status(404).json({ message: 'Not found' });
    res.json(message);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
