const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for the watchlist
const watchlistSchema = new Schema({
  userId: {
    type: String,
    required: true,
    unique: true
  },
  watchlist: {
    type: [String],
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  // Add more fields as needed
});

// Create the Watchlist model
const Watchlist = mongoose.model('Watchlist', watchlistSchema);

module.exports = Watchlist;
