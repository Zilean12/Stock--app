// stock.route.js
const express = require('express');
const { getStockData, getWatchlist, addToWatchlist, removeFromWatchlist } = require('../Controllers/stocks.controller');
const { authenticateUser } = require('../Middleware/stock.middleware');

const router = express.Router();

// Apply middleware
router.use(authenticateUser);

// Routes
router.get('/stock/:symbol', getStockData);
router.get('/watchlist', getWatchlist);
router.post('/watchlist', addToWatchlist);
router.delete('/watchlist/:symbol', removeFromWatchlist);

module.exports = router;
