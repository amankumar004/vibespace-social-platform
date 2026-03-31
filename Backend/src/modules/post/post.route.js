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
  getFeed,
} = require("./post.controller");
const { protect } = require("../../common/middlewares/authMiddleware");
const upload = require("../../common/middlewares/uploadMiddleware");

// Post creation and retrieval
router.post("/", protect, upload.single("image"), createPost); // Create post
router.get("/", getAllPosts); // Get all posts (public feed)
router.get("/user/:userId", getUserPosts); // Get user's posts
router.get("/:id", getPostById); // Get post by ID

// Post modification
router.put("/:id", protect, updatePost); // Update post
router.delete("/:id", protect, deletePost); // Delete post

// Post interactions
router.post("/like/:id", protect, likePost); // Like post
router.post("/unlike/:id", protect, unlikePost); // Unlike post

// Feed
router.get("/feed", protect, getFeed);

module.exports = router;
