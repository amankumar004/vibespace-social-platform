// auth.service.js
const User = require("../user/user.model");
const bcrypt = require("bcryptjs");
const GenerateToken = require("../../common/utils/generateToken");

exports.registerUser = async (username, email, password) => {
  // Validate required fields
  if (!username) {
    throw new Error("Username is required");
  }
  if (!email) {
    throw new Error("Email is required");
  }
  if (!password) {
    throw new Error("Password is required");
  }

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("User already exists with this email");
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const user = await User.create({
    username: username.trim(),
    email: email.trim(),
    password: hashedPassword,
  });

  return {
    id: user._id,
    username: user.username,
    email: user.email,
    token: GenerateToken(user._id),
  };
};

exports.loginUser = async (identifier, password) => {
  // Validate required fields
  if (!identifier) {
    throw new Error("Email or username is required");
  }
  if (!password) {
    throw new Error("Password is required");
  }

  // Find user by email or username
  const user = identifier.includes("@")
    ? await User.findOne({ email: identifier })
    : await User.findOne({ username: identifier });

  if (!user) {
    throw new Error("Invalid credentials");
  }

  // Compare passwords
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid credentials");
  }

  return {
    id: user._id,
    username: user.username,
    email: user.email,
    token: GenerateToken(user._id),
  };
};
