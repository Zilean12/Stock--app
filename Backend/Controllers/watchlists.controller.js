// watchlist.controller.js
const { users } = require('../Middleware/stock.middleware'); // Correctly import the users object

const getWatchlist = (req, res) => {
  const userId = req.userId;
  console.log(`Fetching watchlist for user: ${userId}`); // Add logging for debugging
  if (!users[userId]) {
    console.log(`User not found: ${userId}`); // Log user not found
    return res.status(404).send('User not found');
  }
  res.json(users[userId].watchlist);
};

const addToWatchlist = (req, res) => {
  const userId = req.userId;
  const { symbol } = req.body;
  if (!symbol) {
    return res.status(400).send('Stock symbol is required');
  }
  if (!users[userId]) {
    console.log(`User not found: ${userId}`); // Log user not found
    return res.status(404).send('User not found');
  }
  users[userId].watchlist.push(symbol);
  res.status(201).send('Stock added to watchlist');
};

const removeFromWatchlist = (req, res) => {
  const userId = req.userId;
  const symbol = req.params.symbol;
  if (!users[userId]) {
    console.log(`User not found: ${userId}`); // Log user not found
    return res.status(404).send('User not found');
  }
  users[userId].watchlist = users[userId].watchlist.filter(item => item !== symbol);
  res.send('Stock removed from watchlist');
};

module.exports = {
  getWatchlist,
  addToWatchlist,
  removeFromWatchlist,
};
