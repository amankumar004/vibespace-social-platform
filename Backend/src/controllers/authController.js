const User = require("../models/user");
const becrypt = require("bcryptjs");
const GenerateToken = require("../utils/generateToken");

// Register User
const RegisterUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username) {
      return res.status(400).json({ message: "Username is required" });
    }
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }
    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await becrypt.genSalt(10);

    const hashedPassword = await becrypt.hash(password, salt);

    const user = await User.create({
      username: username,
      email: email,
      password: hashedPassword,
    });
    return res.status(201).json({
      message: "User created successfully",
      id: user._id,
      username: user.username,
      email: user.email,
      token: GenerateToken(user._id),
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Login User
const LoginUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!email && !username) {
      return res.status(400).json({ message: "Email or username is required" });
    }
    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }

    const user =
      (await User.findOne({ email })) || (await User.findOne({ username }));
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const matchedPassword = await becrypt.compare(password, user.password);
    if (!matchedPassword) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    return res.status(201).json({
      message: "User logged in successfully",
      id: user._id,
      username: user.username,
      token: GenerateToken(user._id),
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  RegisterUser,
  LoginUser,
};
