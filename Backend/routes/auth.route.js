const express = require('express');
const authcontroller = require('../Controllers/auth.controller');

const router = express.Router();

router.post('/signup', authcontroller.signup);
router.post('/login', authcontroller.login);

module.exports = router;