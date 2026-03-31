const express = require("express");
const router = express.Router();
const {
  getNotifications,
  markAsRead,
} = require("./notification.controller");
const { protect } = require("../../common/middlewares/authMiddleware");

router.get("/", protect, getNotifications);
router.put("/read", protect, markAsRead);
module.exports = router;
