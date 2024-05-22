// stock.route.js
const express = require('express');
const { getStockData } = require('../Controllers/stocks.controller');
const { authenticateUser } = require('../Middleware/stock.middleware');

const router = express.Router();

// Apply middleware
router.use(authenticateUser);

// Routes
router.get('/stock/:symbol', getStockData);

module.exports = router;
