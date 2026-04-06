import { useState, useRef, useEffect } from "react";
import { Send, ChevronDown, ChevronUp, Loader2 } from "lucide-react";
import { GetPostComments, CreateComment } from "../../services/postActionsService";

const CommentsSection = ({ postId, commentsCount }) => {
  const [expanded, setExpanded] = useState(false);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [count, setCount] = useState(commentsCount || 0);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const fetched = useRef(false);

  const fetchComments = async (pageNum = 1) => {
    setLoading(true);
    try {
      const data = await GetPostComments({ postId, page: pageNum, limit: 10 });
      if (pageNum === 1) {
        setComments(data);
      } else {
        setComments((prev) => [...prev, ...data]);
      }
      setHasMore(data.length === 10);
    } catch (err) {
      console.error("Failed to fetch comments", err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = () => {
    if (!expanded && !fetched.current) {
      fetched.current = true;
      fetchComments(1);
    }
    setExpanded((prev) => !prev);
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchComments(nextPage);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || submitting) return;

    setSubmitting(true);
    try {
      const created = await CreateComment({ postId, content: newComment.trim() });
      setComments((prev) => [created, ...prev]);
      setCount((c) => c + 1);
      setNewComment("");
    } catch (err) {
      console.error("Failed to post comment", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mt-3 border-t border-white/10 pt-3">
      {/* Toggle button */}
      <button
        onClick={handleToggle}
        className="flex items-center gap-1 text-sm text-gray-400 hover:text-purple-400 transition-colors"
      >
        {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        {count > 0
          ? `${count} comment${count !== 1 ? "s" : ""}`
          : "No comments yet"}
      </button>

      {/* Expandable section */}
      {expanded && (
        <div className="mt-3 space-y-3">
          {/* Add comment input */}
          <form onSubmit={handleSubmit} className="flex items-center gap-2">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a comment..."
              maxLength={300}
              className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
            />
            <button
              type="submit"
              disabled={!newComment.trim() || submitting}
              className="p-2 rounded-full bg-purple-600 hover:bg-purple-500 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              {submitting ? (
                <Loader2 size={16} className="animate-spin text-white" />
              ) : (
                <Send size={16} className="text-white" />
              )}
            </button>
          </form>

          {/* Comments list */}
          {loading && comments.length === 0 ? (
            <div className="flex justify-center py-4">
              <Loader2 size={20} className="animate-spin text-gray-400" />
            </div>
          ) : (
            <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
              {comments.map((comment) => (
                <div key={comment._id} className="flex gap-3">
                  {/* Avatar */}
                  <div className="w-8 h-8 rounded-full bg-gray-600 overflow-hidden flex-shrink-0">
                    {comment.userId?.avatar && (
                      <img
                        src={comment.userId.avatar}
                        className="w-full h-full object-cover"
                        alt=""
                      />
                    )}
                  </div>

                  {/* Username & Content */}
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-gray-400">
                      {comment.userId?.username || "Unknown"}
                    </p>
                    <p className="text-sm text-gray-200 mt-0.5 break-words">
                      {comment.content}
                    </p>
                  </div>
                </div>
              ))}

              {/* Load more */}
              {hasMore && comments.length > 0 && (
                <button
                  onClick={handleLoadMore}
                  disabled={loading}
                  className="text-xs text-purple-400 hover:text-purple-300 transition-colors disabled:opacity-50"
                >
                  {loading ? "Loading..." : "Load more"}
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CommentsSection;
