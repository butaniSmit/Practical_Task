const {promisify }= require('util');
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const jwt =require('jsonwebtoken');
const AppError = require('./../utils/appError');
const rolesModel = require('../models/rolesModel');
const bcrypt= require('bcryptjs');

const signToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};
const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const day = process.env.JWT_COOKIE_EXPIRES_IN
  const cookieOptions = {
    expires: new Date(
      Date.now() + day * 24 * 60 * 60 * 1000
    ),
    httpOnly: true
  };
  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

  res.cookie('jwt', token, cookieOptions);

  // Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    tokenexpires: day,
    message: "You have successfully logged in.",
    token,
      user
  });
};
exports.signup = catchAsync(async (req, res, next) => {
  const first_name = req.body.first_name
  const last_name = req.body.last_name
  const email= req.body.email
  const password = req.body.password
  const confirmpassword= req.body.confirmpassword
  const name=`${req.body.first_name+ ' '+ req.body.last_name}` || '';
  const role = req.body.role ||'admin';
  const roleData = await rolesModel.findOne({ role: role })
    const permissions = roleData?._id
    const newUser = await User.create({first_name,last_name,name,email,password,confirmpassword,role,permissions});
    const token= signToken(newUser._id);

    res.status(201).json({
      status: 'success',
      message:"Thanks for signing up. Welcome to our community.",
      data: {
        token,
        user: newUser
      }
    })
});
exports.login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;
    // 1) Check if email and password exist
    if (!email || !password) {
      return next(new AppError('Email and Password is required', 400));
    }
    // 2) Check if user exists && password is correct
    const user = await User.findOne({ email }).select('+password').populate('permissions');
    if (!user ||!(await user.correctPassword(password, user.password))) {
      return next(new AppError('These credentials do not match our records.', 401));
    }
  
    // 3) If everything ok, send token to client
    createSendToken(user, 200, res);
    // const token =signToken(user._id);
    // res.status(200).json({
    //   status:'success',
    //   token
    // })
});


exports.protect = catchAsync(async (req, res, next) => {
  // 1) Getting token and check of it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    return next(
      new AppError('You are not logged in! Please log in to get access.', 401)
    );
  }

  // 2) Verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  // 3) Check if user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError(
        'The user belonging to this token does no longer exist.',
        401
      )
    );
  }

  // 4) Check if user changed password after the token was issued
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError('User recently changed password! Please log in again.', 401)
    );
  }

  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser;
  next();
});

exports.grantAccess = (...permissions)=> {
  return async (req, res, next) => {
    const email = req.user.email
  const user = await User.findOne({ email }).select('+password').populate('permissions');
    if (!user.permissions.permissions.includes(permissions[0])) {
     return res.status(401).json({
      error: "You don't have enough permission to perform this action"
     });
    }
    next()
  }
 }