const express = require('express');
const authcontroller = require('../Controllers/auth.controller');
const authMiddleware = require('../Middleware/authMiddleware');

const router = express.Router();
// Import middleware for authentication (if needed)

router.post('/signup', authcontroller.signup);
router.post('/login', authcontroller.login);
router.get('/profile', authMiddleware.authenticate, authcontroller.getProfile);
router.patch('/profile', authMiddleware.authenticate, authcontroller.updateProfile);

module.exports = router;
