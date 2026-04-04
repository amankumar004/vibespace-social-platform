const postService = require("./post.service");

// Create a Feed with pagination
// TODO: create optimized feed using Cursor like used in instagram and Suggested Posts feature also
const getFeed = async (req, res) => {
  try {
    const userId = req.user._id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;

    const feed = await postService.getFeed(userId, page, limit);

    return res.status(201).json({
      success: true,
      page,
      limit,
      data: feed,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Create a new post
const createPost = async (req, res) => {
  try {
    const { type, content, mood } = req.body;

    let mediaUrl = null;

    if (type === "image") {
      // multer-storage-cloudinary may set the uploaded file URL in
      // `req.file.path`, `req.file.secure_url` or `req.file.url` depending on versions.
      const fileUrl =
        req.file && (req.file.path || req.file.secure_url || req.file.url);
      if (!fileUrl) {
        return res
          .status(400)
          .json({ message: "Media URL is required for image posts" });
      }
      mediaUrl = fileUrl;
    }

    const newPost = await postService.createPost(
      req.user._id,
      type,
      content,
      mediaUrl,
      mood,
    );

    return res.status(201).json({
      success: true,
      message: "Post created successfully",
      data: newPost,
    });
  } catch (error) {
    console.error(error);

    if (
      error.message.includes("required") ||
      error.message.includes("Content is required") ||
      error.message.includes("Media URL is required")
    ) {
      return res.status(400).json({ message: error.message });
    }

    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get post by ID
const getPostById = async (req, res) => {
  try {
    const post = await postService.getPostById(req.params.id);

    return res.status(200).json({
      success: true,
      data: post,
    });
  } catch (error) {
    console.error(error);

    if (error.message.includes("not found")) {
      return res.status(404).json({ message: error.message });
    }

    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get user's posts
const getUserPosts = async (req, res) => {
  try {
    const posts = await postService.getUserPosts(req.params.userId);

    return res.status(200).json({
      success: true,
      count: posts.length,
      data: posts,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get all posts (feed)
const getAllPosts = async (req, res) => {
  try {
    const filters = {
      mood: req.query.mood,
    };

    const posts = await postService.getAllPosts(filters);

    return res.status(200).json({
      success: true,
      count: posts.length,
      data: posts,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Update post
const updatePost = async (req, res) => {
  try {
    const { content, mood, visibility } = req.body;

    const updatedPost = await postService.updatePost(
      req.params.id,
      req.user._id,
      { content, mood, visibility },
    );

    return res.status(200).json({
      success: true,
      message: "Post updated successfully",
      data: updatedPost,
    });
  } catch (error) {
    console.error(error);

    if (error.message.includes("not found")) {
      return res.status(404).json({ message: error.message });
    }

    if (error.message.includes("edit your own")) {
      return res.status(403).json({ message: error.message });
    }

    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete post
const deletePost = async (req, res) => {
  try {
    await postService.deletePost(req.params.id, req.user._id);

    return res.status(200).json({
      success: true,
      message: "Post deleted successfully",
    });
  } catch (error) {
    console.error(error);

    if (error.message.includes("not found")) {
      return res.status(404).json({ message: error.message });
    }

    if (error.message.includes("delete your own")) {
      return res.status(403).json({ message: error.message });
    }

    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  createPost,
  getPostById,
  getUserPosts,
  getAllPosts,
  updatePost,
  deletePost,
  getFeed,
};
