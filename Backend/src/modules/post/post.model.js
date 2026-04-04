const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    type: {
      type: String,
      enum: ["text", "image", "video"],
      required: true,
    },

    content: {
      type: String, // caption or text
      trim: true,
      maxlength: 500,
    },

    mediaUrl: {
      type: String, // image or video URL
      default: null,
    },

    mood: {
      type: String,
      default: null,
    },

    likesCount: {
      type: Number,
      default: 0,
    },

    commentsCount: {
      type: Number,
      default: 0,
    },

    visibility: {
      type: String,
      enum: ["public", "private"],
      default: "public",
    },
  },
  { timestamps: true },
);

// Index for feed
postSchema.index({ createdAt: -1 });

module.exports = mongoose.model("Post", postSchema);
