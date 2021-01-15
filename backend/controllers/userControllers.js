import asyncHandler from "express-async-handler";
import { validationResult } from "express-validator";
import User from "../models/userModel.js";
import { generateToken } from "../utils/generateToken.js";

// @desc    Auth user & get token
// @route   POST /api/user/login
// @access  public
const authUser = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new Error(errors.array()[0].msg);
  }
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    res.status(401);
    throw new Error("No user found with this email");
  }
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      isAdmin: user.isAdmin,
      email: user.email,
      token: generateToken(user._id),
    });
    return;
  }
  res.status(401);
  throw new Error("Invalid password");
});

// @desc    Auth user & get token
// @route   GET /api/user/profile
// @access  private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = req.user;
  if (!user) {
    res.status(404);
    throw new Error("User npt found");
  }
  res.json({
    _id: user._id,
    name: user.name,
    isAdmin: user.isAdmin,
    email: user.email,
  });
});

// @desc    Register user & get token
// @route   POST /api/user/register
// @access  public
const registerUser = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new Error(errors.array()[0].msg);
  }
  const { email, password, name } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }
  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

export { authUser, registerUser, getUserProfile };
