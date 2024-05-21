const User = require('../Models/user.model');
const createError = require('../utils/appError');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register user// Register user
// auth.controller.js

// Register user
exports.signup = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      return next(new createError('User already exists', 400));
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 12);

    const newUser = await User.create({
      ...req.body,
      password: hashedPassword,
    });

    // Generate JWT token using the _id of the newly created user
    const token = jwt.sign({ _id: newUser._id }, 'Secretkey123', { expiresIn: '1h' });

    res.status(201).json({
      status: "Success",
      message: "User registered Successfully",
      token,
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role
      }
    });
  } catch (error) {
    next(error);
  }
};



// Login
exports.login = async (req, res, next) => {
    // res.send('Login');
    try{
        const{email, password} = req.body;
        const user = await User.findOne({email});

        if (!user) return next(new createError("user Not Found!!", 404));
        const ispasswordValid = await bcrypt.compare(password, user.password);

        if (!ispasswordValid){
            return next(new createError("Invaild Password or Email", 401));
        }
         // JWT Assign with increased expiry time (e.g., 180 days)
         const token = jwt.sign({ _id: user._id }, 'Secretkey123', { expiresIn: '1h' });

      res.status(200).json({
        status: "Success",
        message: "User logged in Successfully",
        token,
        user:{
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        }
      })

    }
    catch(error){
        next(error);
    }
};

// Fetch user profile
exports.getProfile = async (req, res, next) => {
  try {
    const userId = req.user._id; // This assumes you have middleware that extracts the user ID from the JWT token
    const user = await User.findById(userId);

    if (!user) {
      return next(new createError('User not found', 404));
    }
    res.status(200).json({
      status: 'success',
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role // You may include additional fields if needed
      }
    });
  } catch (error) {
    next(error);
  }
};