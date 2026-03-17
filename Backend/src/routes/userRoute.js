const express = require("express");
const router = express.Router();
const {
  getUserProfile,
  updateUserProfile,
} = require("../controllers/userController");
const { protect } = require("../middlewares/authMiddleware");

router.get("/me", protect, getUserProfile);
router.put("/me", protect, updateUserProfile);

module.exports = router;
