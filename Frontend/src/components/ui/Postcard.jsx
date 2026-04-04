import { Heart, MessageCircle, Share2 } from "lucide-react";

const PostCard = ({ post }) => {
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
          <span className="flex items-center gap-1 cursor-pointer hover:text-purple-400">
            <Heart size={18} /> {post.likesCount}
          </span>

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
