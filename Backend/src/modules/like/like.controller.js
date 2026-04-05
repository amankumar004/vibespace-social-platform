const likeService = require("./like.service");
const Post = require("../post/post.model");
const Notifications = require("../notification/notification.model");

// Like post
const likePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user._id;
    const result = await likeService.likePost(postId, userId);

    if (result.message === "Post liked") {
      // Notify the post owner about the new like
      const post = await Post.findById(postId);
      if (post && post.userId.toString() !== userId.toString()) {
        await Notifications.create({
          userId: post.userId,
          fromUserId: userId,
          type: "like",
          postId: postId,
        });
      }
    }

    return res.status(200).json({
      success: true,
      message: result.message,
      data: {
        likesCount: result.likesCount,
      },
    });
  } catch (error) {
    console.error(error);

    if (error.message.includes("not found")) {
      return res.status(404).json({ message: error.message });
    }

    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Unlike post
const unlikePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user._id;
    const result = await likeService.unlikePost(postId, userId);

    return res.status(200).json({
      success: true,
      message: result.message,
      data: {
        likesCount: result.likesCount,
      },
    });
  } catch (error) {
    console.error(error);

    if (error.message.includes("not found")) {
      return res.status(404).json({ message: error.message });
    }

    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  likePost,
  unlikePost,
};
