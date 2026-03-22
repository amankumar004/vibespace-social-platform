const commentService = require("../services/comment.service");

// Post a comment
const postComment = async (req, res) => {
  try {
    const { postId } = req.params;
    const { content } = req.body;
    const userId = req.user._id;
    const result = await commentService.postComment(postId, userId, content);

    return res.status(201).json({
      success: true,
      message: "Comment posted successfully",
      data: result,
    });
  } catch (error) {
    console.error(error);

    if (
      error.message.includes("not found") ||
      error.message.includes("empty")
    ) {
      return res.status(400).json({ message: error.message });
    }
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getComments = async (req, res) => {
  try {
    const { postId } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const result = await commentService.getComments(postId, page, limit);

    return res.status(200).json({
      success: true,
      message: "Comments retrieved successfully",
      data: result,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const userId = req.user._id;

    await commentService.deleteComment(commentId, userId);

    return res.status(200).json({
      success: true,
      message: "Comment deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  postComment,
  getComments,
  deleteComment,
};
