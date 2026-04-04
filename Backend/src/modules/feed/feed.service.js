const User = require("../user/user.model");
const Post = require("../post/post.model");

exports.getFeed = async (userId, page, limit) => {
  const user = await User.findById(userId);

  const posts = await Post.find({
    $or: [{ userId: { $in: user.following } }, { visibility: "public" }],
  })
    .populate("userId", "username avatar")
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit);

  return posts;
};
