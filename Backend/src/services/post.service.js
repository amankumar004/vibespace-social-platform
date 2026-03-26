const Post = require("../models/post");
const User = require("../models/user");

exports.getFeed = async (userId, page, limit) => {
  const user = await User.findById(userId);

  const posts = await Post.find({
    userId: { $in: user.following },
  })
    .populate("userId", "username, avatar")
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit);

  return posts;
};

exports.createPost = async (userId, type, content, mediaUrl, mood) => {
  // Validate post type and content
  if (type === "text" && !content) {
    throw new Error("Content is required for text posts");
  }

  if ((type === "image" || type === "video") && !mediaUrl) {
    throw new Error("Media URL is required for image/video posts");
  }

  // Create post
  const newPost = await Post.create({
    userId: userId,
    type,
    content: content ? content.trim() : "",
    mediaUrl: mediaUrl ? mediaUrl.trim() : null,
    mood: mood || "thoughtful",
  });

  return newPost.populate("userId", "username avatar");
};

exports.getPostById = async (postId) => {
  const post = await Post.findById(postId)
    .populate("userId", "username avatar email")
    .populate("likes", "username avatar");

  if (!post) {
    throw new Error("Post not found");
  }

  return post;
};

exports.getUserPosts = async (userId) => {
  const posts = await Post.find({ userId })
    .sort({ createdAt: -1 })
    .populate("userId", "username avatar email")
    .populate("likes", "username avatar");

  return posts;
};

exports.getAllPosts = async (filters = {}) => {
  const query = { visibility: "public" };

  if (filters.mood) {
    query.mood = filters.mood;
  }

  const posts = await Post.find(query)
    .sort({ createdAt: -1 })
    .populate("userId", "username avatar email")
    .populate("likes", "username avatar");

  return posts;
};

exports.updatePost = async (postId, userId, updateData) => {
  const { content, mood, visibility } = updateData;

  const post = await Post.findById(postId);

  if (!post) {
    throw new Error("Post not found");
  }

  // Verify ownership
  if (post.userId.toString() !== userId.toString()) {
    throw new Error("You can only edit your own posts");
  }

  // Update fields
  if (content) post.content = content.trim();
  if (mood) post.mood = mood;
  if (visibility) post.visibility = visibility;

  const updatedPost = await post.save();
  return updatedPost.populate("userId", "username avatar email");
};

exports.deletePost = async (postId, userId) => {
  const post = await Post.findById(postId);

  if (!post) {
    throw new Error("Post not found");
  }

  // Verify ownership
  if (post.userId.toString() !== userId.toString()) {
    throw new Error("You can only delete your own posts");
  }

  await Post.findByIdAndDelete(postId);

  return { message: "Post deleted successfully" };
};

exports.likePost = async (postId, userId) => {
  const post = await Post.findById(postId);

  if (!post) {
    throw new Error("Post not found");
  }

  // Check if already liked
  if (post.likes.includes(userId)) {
    throw new Error("You have already liked this post");
  }

  post.likes.push(userId);
  await post.save();

  return {
    message: "Post liked successfully",
    likesCount: post.likes.length,
  };
};

exports.unlikePost = async (postId, userId) => {
  const post = await Post.findById(postId);

  if (!post) {
    throw new Error("Post not found");
  }

  // Check if post is liked
  if (!post.likes.includes(userId)) {
    throw new Error("You have not liked this post");
  }

  post.likes = post.likes.filter((id) => id.toString() !== userId.toString());
  await post.save();

  return {
    message: "Post unliked successfully",
    likesCount: post.likes.length,
  };
};
