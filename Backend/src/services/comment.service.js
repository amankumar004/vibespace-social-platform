const Comment = require("../models/comments");
const Post = require("../models/post");

exports.postComment = async (postId, userId, content) => {
  if (!content || content.trim() === "") {
    throw new Error("Comment content cannot be empty");
  }

  // Check if post exists
  const post = await Post.findById(postId);
  if (!post) {
    throw new Error("Post not found");
  }

  // Create comment
  const newComment = await Comment.create({
    postId,
    userId,
    content: content.trim(),
  });

  post.commentsCount += 1;
  await post.save();

  return newComment.populate("userId", "username avatar");
};

exports.getComments = async (postId, page, limit) => {
  const skip = (page - 1) * limit;

  const comments = await Comment.find({ postId })
    .populate("userId", "username avatar")
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });

  return comments;
};

exports.deleteComment = async (commentId, userId) => {
  const comment = await Comment.findById(commentId);

  if (!comment) {
    throw new Error("Comment not found");
  }

  // Get the post to check if user is the post author
  const post = await Post.findById(comment.postId);
  if (!post) {
    throw new Error("Post not found");
  }

  // Check if user is either the comment author or the post author
  const isCommentAuthor = comment.userId.toString() === userId.toString();
  const isPostAuthor = post.userId.toString() === userId.toString();

  if (!isCommentAuthor && !isPostAuthor) {
    throw new Error("You are not authorized to delete this comment");
  }

  await comment.deleteOne();

  // Decrement comments count in post
  post.commentsCount = Math.max(0, post.commentsCount - 1);
  await post.save();
};
