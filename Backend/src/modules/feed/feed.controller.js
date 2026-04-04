const feedService = require("./feed.service");

// Create a Feed with pagination
// TODO: create optimized feed using Cursor like used in instagram and Suggested Posts feature also
const getFeed = async (req, res) => {
  try {
    const userId = req.user._id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;

    const feed = await feedService.getFeed(userId, page, limit);

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

module.exports = {
  getFeed,
};
