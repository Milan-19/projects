const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../model/User");

const userCtrl = {
  //! Register a new user
  register: asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    // Validate input
    if (!username || !email || !password) {
      throw new Error("Please provide all required fields");
    }

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      throw new Error("User already exists");
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const userCreated = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    res.json({ message: "User registered successfully" });
  }),

  //! Login a user
  login: asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      throw new Error("Please provide all required fields");
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Invalid credentials");
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid credentials");
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({
      message: "Login successful",
      token: token,
      user: { id: user._id, username: user.username, email: user.email },
    });
  }),

  //! Get user profile
  profile: asyncHandler(async (req, res) => {
    //Find the user
    const user = await User.findById(req.user).select("-password");

    res.json({ user });
  }),
};

module.exports = userCtrl;
