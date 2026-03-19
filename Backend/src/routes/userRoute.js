const express = require("express");
const router = express.Router();
const {
  getUserProfile,
  updateUserProfile,
  followUser,
  unfollowUser,
} = require("../controllers/userController");
const { protect } = require("../middlewares/authMiddleware");

router.get("/me", protect, getUserProfile);
router.put("/me", protect, updateUserProfile);

router.post("/follow/:id", protect, followUser);
router.post("/unfollow/:id", protect, unfollowUser);

module.exports = router;
