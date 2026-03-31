const Notification = require("./notification.model");

// Get notifications for a user
exports.getNotifications = async (userId) => {
  if (!userId) {
    throw new Error("User not Found");
  }

  const notifications = await Notification.find({
    userId: userId,
    isRead: false,
  })
    .populate("fromUserId", "username avatar")
    .populate("postId")
    .sort({ createdAt: -1 })
    .limit(20);

  return notifications;
};

// Mark notifications as read
exports.markAsRead = async (userId) => {
  if (!userId) {
    throw new Error("User not Found");
  }

  await Notification.updateMany(
    {
      userId: userId,
      isRead: false,
    },
    { $set: { isRead: true } },
  );
};
