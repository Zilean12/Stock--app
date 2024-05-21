const jwt = require('jsonwebtoken');
const User = require('../Models/user.model');

exports.authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]; // Assumes the Authorization header is in the format: Bearer <token>
    // const decodedToken = jwt.verify(token, 'Secretkey123'); // Replace 'YOUR_SECRET_KEY' with your actual secret key
    const decoded = jwt.verify(token, 'Secretkey123');
    console.log(decoded);
    
    // const user = await User.findById(decodedToken.id);
    const user = await User.findById(decoded._id);
    console.log(user);
    if (!user) {
      throw new Error('User not found');
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};