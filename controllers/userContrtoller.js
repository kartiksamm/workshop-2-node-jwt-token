const AppErrors = require("./../utils/appError");
const User = require("./../models/userModel");
const CatchAsync = require("./../utils/catchAsync");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const signToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
exports.signup = CatchAsync(async (req, res, next) => {
  const newUser = await User.create(req.body);
  const token = signToken(newUser._id);
  res.status(200).json({
    status: "suceess",
    data: {
      user: newUser,
      token,
    },
  });
});
exports.login = CatchAsync(async (req, res, next) => {
  const { name, password } = req.body;
  if (!name || !password) {
    return next(new AppErrors("please provide email or password", 400));
  }
  const user = await User.findOne({ name: name });
  console.log(user);
  if (!user) {
    return next(new AppErrors("Incorrect email or password", 401));
  }
  const token = signToken(user._id);
  res.status(200).json({
    status: "success",
    token,
  });
});

exports.protect = CatchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  console.log(token);
  if (!token) {
    return res.status(400).json({
      message: "you are not logged in",
    });
  }
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  console.log(decoded);
  const freshuser = await User.findById(decoded.id);
  if (freshuser) {
    return res.status.json({
      message: "true",
    });
  }
  req.user = freshuser;
  next();
});
exports.getAllUsers = CatchAsync(async (req, res, next) => {
  const tours = await User.find();
  res.status(200).json({
    status: "suceess",
    data: {
      length: tours.length,
      tours,
    },
  });
});
