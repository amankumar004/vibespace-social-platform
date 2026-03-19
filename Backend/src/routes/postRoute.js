const express = require("express");
const router = express.Router();
const {
  createPost,
  getPostById,
  getUserPosts,
  getAllPosts,
  updatePost,
  deletePost,
  likePost,
  unlikePost,
} = require("../controllers/postController");
const { protect } = require("../middlewares/authMiddleware");

// Post creation and retrieval
router.post("/", protect, createPost); // Create post
router.get("/", getAllPosts); // Get all posts (public feed)
router.get("/user/:userId", getUserPosts); // Get user's posts
router.get("/:id", getPostById); // Get post by ID

// Post modification
router.put("/:id", protect, updatePost); // Update post
router.delete("/:id", protect, deletePost); // Delete post

// Post interactions
router.post("/like/:id", protect, likePost); // Like post
router.post("/unlike/:id", protect, unlikePost); // Unlike post

module.exports = router;
