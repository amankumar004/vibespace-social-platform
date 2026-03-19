const userService = require("../services/user.service");

const getUserProfile = async (req, res) => {
  try {
    const user = await userService.getUserProfile(req.user._id);

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error(error);

    if (error.message.includes("not found")) {
      return res.status(404).json({ message: error.message });
    }

    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateUserProfile = async (req, res) => {
  try {
    const { username, email, bio, avatar } = req.body;

    const updatedUser = await userService.updateUserProfile(req.user._id, {
      username,
      email,
      bio,
      avatar,
    });

    res.status(200).json({
      success: true,
      message: "User profile updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.error(error);

    if (error.message.includes("not found")) {
      return res.status(404).json({ message: error.message });
    }

    if (error.message.includes("already exists")) {
      return res.status(400).json({ message: error.message });
    }

    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const followUser = async (req, res) => {
  try {
    const result = await userService.followUser(req.user._id, req.params.id);

    res.status(200).json({
      success: true,
      message: result.message,
      data: {
        followingCount: result.followingCount,
      },
    });
  } catch (error) {
    console.error(error);

    if (error.message.includes("cannot follow yourself")) {
      return res.status(400).json({ message: error.message });
    }

    if (error.message.includes("not found")) {
      return res.status(404).json({ message: error.message });
    }

    if (error.message.includes("already following")) {
      return res.status(400).json({ message: error.message });
    }

    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const unfollowUser = async (req, res) => {
  try {
    const result = await userService.unfollowUser(req.user._id, req.params.id);

    res.status(200).json({
      success: true,
      message: result.message,
      data: {
        followingCount: result.followingCount,
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
  getUserProfile,
  updateUserProfile,
  followUser,
  unfollowUser,
};
