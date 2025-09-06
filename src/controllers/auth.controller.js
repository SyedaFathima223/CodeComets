const jwt = require('jsonwebtoken');
const User = require('../models/User'); // make sure you have User model

// Helper: generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: 'User already exists' });

    user = await User.create({ email, password });
    res.status(201).json({ token: generateToken(user._id), user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    res.json({ token: generateToken(user._id), user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.me = async (req, res) => {
  res.json({ user: req.user });
};

exports.forgotPassword = async (req, res) => {
  res.json({ message: 'Forgot password logic not yet implemented' });
};

exports.resetPassword = async (req, res) => {
  res.json({ message: 'Reset password logic not yet implemented' });
};
