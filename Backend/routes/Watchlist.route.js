const express = require('express');
const router = express.Router();
const watchlistController = require('../Controllers/watchlists.controller');
const authMiddleware = require('../Middleware/authenticate');

router.get('/watchlist', authMiddleware, watchlistController.getWatchlist);
router.post('/watchlist', authMiddleware, watchlistController.addToWatchlist);
router.delete('/watchlist/:symbol', authMiddleware, watchlistController.removeFromWatchlist);

module.exports = router;