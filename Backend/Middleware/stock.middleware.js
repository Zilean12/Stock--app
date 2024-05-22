// stock.middleware.js
let users = {}; // In-memory store for user data

const authenticateUser = (req, res, next) => {
  const userId = req.headers['user-id'];
  console.log(`Received user-id: ${userId}`); // Add logging for debugging
  if (!userId) {
    return res.status(401).send('User ID is required');
  }
  req.userId = userId;
  if (!users[userId]) {
    users[userId] = { watchlist: [] };
    console.log(`New user initialized: ${userId}`); // Log user initialization
  }
  console.log(`User authenticated: ${userId}, Watchlist: ${users[userId].watchlist}`); // Log authenticated user
  next();
};

module.exports = {
  authenticateUser,
  users, // Exporting users for use in controllers
};
