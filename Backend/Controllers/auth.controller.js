const User = require('../Models/user.model');
const createError = require('../utils/appError');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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

    // JWT Assign
    const token = jwt.sign({ _id: newUser._id }, "Secretkey123", {
      expiresIn: '90d',
    });
    res.status(201).json({
      status: "Success",
      message: "User registered Successfully",
      token,
        user:{
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
         // JWT Assign
        const token = jwt.sign({ _id: User._id }, "Secretkey123", {
        expiresIn: '90d',
      });

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
