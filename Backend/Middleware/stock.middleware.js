// stock.middleware.js
let users = {}; // In-memory store for user data

const authenticateUser = (req, res, next) => {
  const userId = req.headers['user-id'];
  if (!userId) {
    return res.status(401).send('User ID is required');
  }
  req.userId = userId;
  if (!users[userId]) {
    users[userId] = { watchlist: [] };
  }
  next();
};

module.exports = {
  authenticateUser,
  users, // Exporting users for use in controllers
};
