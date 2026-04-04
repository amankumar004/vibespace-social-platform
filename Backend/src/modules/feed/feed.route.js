const { protect } = require("../../common/middlewares/authMiddleware");
const { getFeed } = require("./feed.controller");
const router = require("express").Router();

// Feed
router.get("/", protect, getFeed);

module.exports = router;
