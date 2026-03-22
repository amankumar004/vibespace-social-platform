const notificationService = require("../services/notification.service");

const getNotifications = async (req, res) => {
  try {
    const userId = req.user._id;
    const result = await notificationService.getNotifications(userId);

    if (result.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No new notifications",
        data: [],
      });
    }

    return res.status(200).json({
      success: true,
      message: "Notifications retrieved successfully",
      data: result,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const markAsRead = async (req, res) => {
  try {
    const userId = req.user._id;
    await notificationService.markAsRead(userId);

    return res.status(200).json({
      success: true,
      message: "Notifications marked as read",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getNotifications,
  markAsRead,
};
