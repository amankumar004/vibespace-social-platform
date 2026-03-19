const authService = require("../services/auth.service");

// Register User
const RegisterUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const result = await authService.registerUser(username, email, password);

    return res.status(201).json({
      message: "User created successfully",
      data: result,
    });
  } catch (error) {
    console.error(error);

    // Handle specific validation errors
    if (
      error.message.includes("required") ||
      error.message.includes("already exists")
    ) {
      return res.status(400).json({ message: error.message });
    }

    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Login User
const LoginUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const result = await authService.loginUser(email, username, password);

    return res.status(200).json({
      message: "User logged in successfully",
      data: result,
    });
  } catch (error) {
    console.error(error);

    // Handle specific validation errors
    if (
      error.message.includes("required") ||
      error.message.includes("Invalid credentials")
    ) {
      return res.status(400).json({ message: error.message });
    }

    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  RegisterUser,
  LoginUser,
};
