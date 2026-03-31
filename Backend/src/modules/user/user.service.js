// user.service.js
const Notifications = require("../notification/notification.model");
const User = require("./user.model");

exports.getUserProfile = async (userId) => {
  const user = await User.findById(userId)
    .select("-password")
    .populate("followers", "username email avatar")
    .populate("following", "username email avatar");

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

exports.updateUserProfile = async (userId, updateData) => {
  const { username, email, bio, avatar } = updateData;

  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }

  // Check if username or email is already taken by another user
  if (username || email) {
    const existingUser = await User.findOne({
      $or: [{ username: username?.trim() }, { email: email?.trim() }],
      _id: { $ne: userId },
    });

    if (existingUser) {
      throw new Error("Username or email already exists");
    }
  }

  // Update user fields
  if (username) user.username = username.trim();
  if (email) user.email = email.trim();
  if (bio !== undefined) user.bio = bio.trim();
  if (avatar !== undefined) user.avatar = avatar.trim();

  const updatedUser = await user.save();

  return {
    id: updatedUser._id,
    username: updatedUser.username,
    email: updatedUser.email,
    bio: updatedUser.bio,
    avatar: updatedUser.avatar,
  };
};

exports.followUser = async (currentUserId, targetUserId) => {
  // Prevent users from following themselves
  if (currentUserId.toString() === targetUserId.toString()) {
    throw new Error("You cannot follow yourself");
  }

  const currentUser = await User.findById(currentUserId);
  const targetUser = await User.findById(targetUserId);

  if (!currentUser) {
    throw new Error("Current user not found");
  }

  if (!targetUser) {
    throw new Error("Target user not found");
  }

  // Check if already following
  if (currentUser.following.includes(targetUserId)) {
    throw new Error("You are already following this user");
  }

  currentUser.following.push(targetUserId);
  targetUser.followers.push(currentUserId);

  await currentUser.save();
  await targetUser.save();

  return {
    message: "User followed successfully",
    followingCount: currentUser.following.length,
  };
};

exports.unfollowUser = async (currentUserId, targetUserId) => {
  const currentUser = await User.findById(currentUserId);
  const targetUser = await User.findById(targetUserId);

  if (!currentUser) {
    throw new Error("Current user not found");
  }

  if (!targetUser) {
    throw new Error("Target user not found");
  }

  // Remove targetUser from currentUser's following list
  currentUser.following = currentUser.following.filter(
    (id) => id.toString() !== targetUserId.toString(),
  );

  // Remove currentUser from targetUser's followers list
  targetUser.followers = targetUser.followers.filter(
    (id) => id.toString() !== currentUserId.toString(),
  );

  await currentUser.save();
  await targetUser.save();

  return {
    message: "User unfollowed successfully",
    followingCount: currentUser.following.length,
  };
};
