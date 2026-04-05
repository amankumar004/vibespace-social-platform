const User = require("../user/user.model");
const Post = require("../post/post.model");
const Like = require("../like/like.model");

// Return feed posts annotated with `isLiked` for the current user
exports.getFeed = async (userId, page, limit) => {
  const user = await User.findById(userId);

  const posts = await Post.find({
    $or: [{ userId: { $in: user.following } }, { visibility: "public" }],
  })
    .populate("userId", "username avatar")
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit)
    .lean();

  // Get all post IDs and fetch likes by the current user in one query
  const postIds = posts.map((p) => p._id);
  const likedDocs = await Like.find({
    userId,
    postId: { $in: postIds },
  }).select("postId");
  const likedSet = new Set(likedDocs.map((d) => String(d.postId)));

  // Annotate posts with isLiked (boolean)
  const annotated = posts.map((p) => ({
    ...p,
    isLiked: likedSet.has(String(p._id)),
  }));

  return annotated;
};
