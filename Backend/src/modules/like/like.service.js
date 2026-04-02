const Like = require("./like.model");
const Post = require("../post/post.model");

exports.likePost = async (postId, userId) => {
  const post = await Post.findById(postId);
  if (!post) {
    throw new Error("Post not found");
  }

  try {
    await Like.create({ postId, userId });

    await Post.findByIdAndUpdate(postId, {
      $inc: { likesCount: 1 },
    });

    return {
      message: "Post liked",
      likesCount: post.likesCount + 1,
    };
  } catch (err) {
    if (err.code === 11000) {
      return { message: "Already liked", likesCount: post.likesCount };
    }
    throw err;
  }
};

exports.unlikePost = async (postId, userId) => {
  const post = await Post.findById(postId);
  if (!post) {
    throw new Error("Post not found");
  }

  const result = await Like.findOneAndDelete({ postId, userId });

  if (!result) {
    return { message: "Already unliked", likesCount: post.likesCount };
  }

  await Post.findByIdAndUpdate(postId, {
    $inc: { likesCount: -1 },
  });

  return {
    message: "Post unliked",
    likesCount: post.likesCount - 1,
  };
};
