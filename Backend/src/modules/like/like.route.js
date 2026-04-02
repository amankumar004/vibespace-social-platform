const express = require("express");
const router = express.Router();
const { likePost, unlikePost } = require("./like.controller");
const { protect } = require("../../common/middlewares/authMiddleware");

router.post("/:id", protect, likePost); // Like post
router.delete("/:id", protect, unlikePost); // Unlike post

module.exports = router;
