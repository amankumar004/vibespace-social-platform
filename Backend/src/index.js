const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");
const authRoute = require("./modules/auth/auth.route");
const userRoute = require("./modules/user/user.route");
const postRoute = require("./modules/post/post.route");
const commentRoute = require("./modules/comment/comment.route");
const notificationRoute = require("./modules/notification/notification.route");

// Connect to MongoDB
connectDB();

// Initialize Express app
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Routes
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/comments", commentRoute);
app.use("/api/notifications", notificationRoute);

// Test route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});

// Global error handler - return JSON for errors (helps API clients)
app.use((err, req, res, next) => {
  console.error(err);
  const status = err.status || 500;
  // If err is an Error instance, use its message; otherwise stringify
  const message = err && err.message ? err.message : JSON.stringify(err);
  res.status(status).json({ success: false, message });
});
