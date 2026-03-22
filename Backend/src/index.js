const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");
const authRoute = require("./routes/authRoute");
const userRoute = require("./routes/userRoute");
const postRoute = require("./routes/postRoute");
const commentRoute = require("./routes/commentRoute");
const notificationRoute = require("./routes/notificationRoute");

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
