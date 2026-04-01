import { Heart, MessageCircle, Share2 } from "lucide-react";

const PostCard = () => {
  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4">
      {/* User */}
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-full bg-gray-600"></div>
        <div>
          <p className="font-semibold">Avery K.</p>
          <p className="text-sm text-gray-400">🔥 Hype</p>
        </div>
      </div>

      {/* Image */}
      <div className="w-full h-56 bg-gray-700 rounded-xl mb-3"></div>

      {/* Caption */}
      <p className="text-gray-300 mb-3">Last night was unreal!</p>

      {/* Actions */}
      <div className="flex justify-between text-gray-400">
        <div className="flex gap-4">
          <span className="flex items-center gap-1 cursor-pointer hover:text-purple-400">
            <Heart size={18} /> Like
          </span>
          <span className="flex items-center gap-1 cursor-pointer hover:text-purple-400">
            <MessageCircle size={18} /> Comment
          </span>
        </div>

        <span className="flex items-center gap-1 cursor-pointer hover:text-purple-400">
          <Share2 size={18} /> Share
        </span>
      </div>
    </div>
  );
};

export default PostCard;
