import { Heart, MessageCircle, Share2 } from "lucide-react";
import { useState } from "react";
import { LikePost, UnlikePost } from "../../services/postActionsService";

const PostCard = ({ post }) => {
  const [isLiked, setIsLiked] = useState(!!post.isLiked);
  const [likesCount, setLikesCount] = useState(post.likesCount || 0);

  const toggleLike = async () => {
    const prevLiked = isLiked;
    const prevCount = likesCount;

    // optimistic UI
    setIsLiked(!prevLiked);
    setLikesCount(prevLiked ? Math.max(0, prevCount - 1) : prevCount + 1);

    try {
      if (!prevLiked) {
        await LikePost({ postId: post._id || post.id });
      } else {
        await UnlikePost({ postId: post._id || post.id });
      }
    } catch (err) {
      // rollback on error
      setIsLiked(prevLiked);
      setLikesCount(prevCount);
      console.error("Like toggle failed", err);
    }
  };

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4">
      {/* User */}
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-full bg-gray-600 overflow-hidden">
          {post.userId?.avatar && (
            <img
              src={post.userId.avatar}
              className="w-full h-full object-cover"
            />
          )}
        </div>

        <div>
          <p className="font-semibold">{post.userId?.username || "Unknown"}</p>
          <p className="text-sm text-gray-400">{post.mood}</p>
        </div>
      </div>

      {/* Image (only if exists) */}
      {post.mediaUrl && (
        <img
          src={post.mediaUrl}
          className="w-full h-56 object-cover rounded-xl mb-3"
        />
      )}

      {/* Text Content */}
      {post.content && <p className="text-gray-300 mb-3">{post.content}</p>}

      {/* Actions */}
      <div className="flex justify-between text-gray-400 text-sm">
        <div className="flex gap-4">
          <button
            onClick={toggleLike}
            className={`flex items-center gap-1 focus:outline-none transition-colors ${
              isLiked ? "text-pink-500" : "hover:text-purple-400"
            }`}
            aria-pressed={isLiked}
          >
            <Heart size={18} fill={isLiked ? "currentColor" : "none"} />{" "}
            {likesCount}
          </button>

          <span className="flex items-center gap-1 cursor-pointer hover:text-purple-400">
            <MessageCircle size={18} /> {post.commentsCount}
          </span>
        </div>

        <span className="flex items-center gap-1 cursor-pointer hover:text-purple-400">
          <Share2 size={18} />
        </span>
      </div>
    </div>
  );
};

export default PostCard;
