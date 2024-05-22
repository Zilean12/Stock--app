// watchlist.route.js
const express = require('express');
const router = express.Router();
const { authenticateUser } = require('../Middleware/stock.middleware');
const watchlistsController = require('../Controllers/watchlists.controller');

router.use(authenticateUser); // Apply middleware

router.get('/watchlist', watchlistsController.getWatchlist);
router.post('/watchlist', watchlistsController.addToWatchlist);
router.delete('/watchlist/:symbol', watchlistsController.removeFromWatchlist);

module.exports = router;
