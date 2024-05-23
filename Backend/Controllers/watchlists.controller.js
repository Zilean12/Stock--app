const Watchlist = require('../Models/Watchlist.model');

const getWatchlist = async (req, res) => {
  const userId = req.userId;
  try {
    const userWatchlist = await Watchlist.findOne({ userId });
    if (!userWatchlist) {
      return res.status(404).send('User not found');
    }
    res.json(userWatchlist.watchlist);
  } catch (error) {
    res.status(500).send('Error fetching watchlist');
  }
};


const addToWatchlist = async (req, res) => {
  const userId = req.userId;
  const { symbols } = req.body;
  if (!Array.isArray(symbols) || symbols.length === 0) {
    return res.status(400).send('Stock symbols must be provided as a non-empty array');
  }
  try {
    const userWatchlist = await Watchlist.findOneAndUpdate(
      { userId },
      { $addToSet: { watchlist: { $each: symbols } } },
      { new: true, upsert: true }
    );
    res.status(201).send('Stocks added to watchlist');
  } catch (error) {
    console.error('Error adding to watchlist:', error);
    res.status(500).send('Error adding to watchlist');
  }
};

const removeFromWatchlist = async (req, res) => {
  const userId = req.userId;
  const symbol = req.params.symbol;
  try {
    const userWatchlist = await Watchlist.findOneAndUpdate(
      { userId },
      { $pull: { watchlist: symbol } },
      { new: true }
    );
    if (!userWatchlist) {
      return res.status(404).send('User not found');
    }
    res.send('Stock removed from watchlist');
  } catch (error) {
    res.status(500).send('Error removing from watchlist');
  }
};

module.exports = {
  getWatchlist,
  addToWatchlist,
  removeFromWatchlist,
};