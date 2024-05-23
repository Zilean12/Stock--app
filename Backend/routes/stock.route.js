const express = require('express');
const router = express.Router();
const { getStockData } = require('../controllers/stocks.controller');

router.get('/:symbol', getStockData);

module.exports = router;
