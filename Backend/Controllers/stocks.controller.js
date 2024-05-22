// stock.controller.js
const { fetchStockData } = require('../utils/alphaVantage.utils');
const { users } = require('../Middleware/stock.middleware');

const getStockData = async (req, res) => {
  const symbol = req.params.symbol;
  try {
    const data = await fetchStockData(symbol);
    res.json(data);
  } catch (error) {
    res.status(500).send('Error fetching stock data');
  }
};

// const getWatchlist = (req, res) => {
//   const userId = req.userId;
//   res.json(users[userId].watchlist);
// };

// const addToWatchlist = (req, res) => {
//   const userId = req.userId;
//   const { symbol } = req.body;
//   if (!symbol) {
//     return res.status(400).send('Stock symbol is required');
//   }
//   users[userId].watchlist.push(symbol);
//   res.status(201).send('Stock added to watchlist');
// };

// const removeFromWatchlist = (req, res) => {
//   const userId = req.userId;
//   const symbol = req.params.symbol;
//   users[userId].watchlist = users[userId].watchlist.filter(item => item !== symbol);
//   res.send('Stock removed from watchlist');
// };

module.exports = {
  getStockData,
//   getWatchlist,
//   addToWatchlist,
//   removeFromWatchlist,
};
