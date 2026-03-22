const express = require("express");
const router = express.Router();

const {
  postComment,
  getComments,
  deleteComment,
} = require("../controllers/commentController");
const { protect } = require("../middlewares/authMiddleware");

router.post("/:postId", protect, postComment);
router.get("/:postId", protect, getComments);
router.delete("/:commentId", protect, deleteComment);

module.exports = router;
