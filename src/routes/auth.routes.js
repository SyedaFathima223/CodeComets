const express = require('express');
const { body } = require('express-validator');
const { protect } = require('../middleware/auth');
const auth = require('../controllers/auth.controller');

const router = express.Router();

router.post('/register', [
  body('email').isEmail(),
  body('password').isLength({ min: 6 })
], auth.register);

router.post('/login', auth.login);
router.get('/me', protect, auth.me);
router.post('/forgot', auth.forgotPassword);
router.post('/reset', auth.resetPassword);

module.exports = router;
