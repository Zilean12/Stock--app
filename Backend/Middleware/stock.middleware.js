const Watchlist = require('../Models/Watchlist.model'); // Import the Watchlist model

const authenticateUser = async (req, res, next) => {
  const userId = req.headers['user-id'];
  console.log(`Received user-id: ${userId}`); // Add logging for debugging
  if (!userId) {
    return res.status(401).send('User ID is required');
  }
  req.userId = userId;

  try {
    // Check if the user exists in the database, if not create a new entry
    let userWatchlist = await Watchlist.findOne({ userId });
    if (!userWatchlist) {
      userWatchlist = new Watchlist({ userId, watchlist: [] });
      await userWatchlist.save();
      console.log(`New user initialized: ${userId}`); // Log user initialization
    }
    next();
  } catch (error) {
    res.status(500).send('Error in user authentication');
  }
};

module.exports = {
  authenticateUser,
};
