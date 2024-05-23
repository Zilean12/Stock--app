const jwt = require('jsonwebtoken');

// Define your JWT secret key (replace 'YOUR_SECRET_KEY' with your actual secret key)
const JWT_SECRET = 'Secretkey123';

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).send('Access token is missing');
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET); // Use the JWT secret key here
    req.userId = decoded._id;
    next();
  } catch (error) {
    console.error('Invalid token:', error);
    res.status(401).send('Invalid token');
  }
};

module.exports = authMiddleware;