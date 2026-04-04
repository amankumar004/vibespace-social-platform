import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Type, ImagePlus, X } from "lucide-react";
import MainLayout from "../components/ui/MainLayout";
import { createTextPost, createImagePost } from "../services/postService";

const MOODS = [
  "happy",
  "sad",
  "excited",
  "thoughtful",
  "chill",
  "angry",
  "grateful",
  "inspired",
];

const CreatePostPage = () => {
  const navigate = useNavigate();
  const [postType, setPostType] = useState(null); // null = selection screen
  const [content, setContent] = useState("");
  const [mood, setMood] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const removeImage = () => {
    setImageFile(null);
    if (imagePreview) URL.revokeObjectURL(imagePreview);
    setImagePreview(null);
  };

  const resetForm = () => {
    setPostType(null);
    setContent("");
    setMood("");
    removeImage();
    setError("");
  };

  const handleSubmit = async () => {
    setError("");

    if (postType === "text" && !content.trim()) {
      setError("Content is required for text posts.");
      return;
    }

    if (postType === "image" && !imageFile) {
      setError("Please select an image.");
      return;
    }

    setLoading(true);
    try {
      if (postType === "text") {
        await createTextPost({ content: content.trim(), mood: mood || undefined });
      } else {
        await createImagePost({
          image: imageFile,
          content: content.trim() || undefined,
          mood: mood || undefined,
        });
      }
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create post.");
    } finally {
      setLoading(false);
    }
  };

  // Type selection screen
  if (!postType) {
    return (
      <MainLayout rightChildren={null}>
        <div className="mb-6">
          <h2 className="text-2xl font-semibold">Create Post</h2>
          <p className="text-gray-400 mt-1">Choose what you want to share</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => setPostType("text")}
            className="flex flex-col items-center justify-center gap-3 p-8 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 hover:border-purple-500/50 transition-all duration-200 group"
          >
            <Type size={40} className="text-purple-400 group-hover:text-purple-300" />
            <span className="text-lg font-medium">Text Post</span>
            <span className="text-sm text-gray-400">Share your thoughts</span>
          </button>

          <button
            onClick={() => setPostType("image")}
            className="flex flex-col items-center justify-center gap-3 p-8 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 hover:border-purple-500/50 transition-all duration-200 group"
          >
            <ImagePlus size={40} className="text-purple-400 group-hover:text-purple-300" />
            <span className="text-lg font-medium">Image Post</span>
            <span className="text-sm text-gray-400">Share a photo</span>
          </button>
        </div>
      </MainLayout>
    );
  }

  // Post creation form
  return (
    <MainLayout rightChildren={null}>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">
            {postType === "text" ? "Text Post" : "Image Post"}
          </h2>
          <p className="text-gray-400 mt-1">
            {postType === "text"
              ? "Write something on your mind"
              : "Upload an image with a caption"}
          </p>
        </div>
        <button
          onClick={resetForm}
          className="text-gray-400 hover:text-white transition-colors text-sm"
        >
          Change type
        </button>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-5">
        {/* Image upload (image type only) */}
        {postType === "image" && (
          <div>
            {imagePreview ? (
              <div className="relative">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full max-h-80 object-cover rounded-xl"
                />
                <button
                  onClick={removeImage}
                  className="absolute top-2 right-2 p-1.5 bg-black/60 rounded-full hover:bg-black/80 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center gap-2 p-10 border-2 border-dashed border-white/10 rounded-xl cursor-pointer hover:border-purple-500/50 hover:bg-white/5 transition-all">
                <ImagePlus size={32} className="text-gray-400" />
                <span className="text-gray-400 text-sm">Click to select an image</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageSelect}
                  className="hidden"
                />
              </label>
            )}
          </div>
        )}

        {/* Content textarea */}
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={
            postType === "text"
              ? "What's on your mind?"
              : "Add a caption (optional)..."
          }
          maxLength={500}
          rows={postType === "text" ? 5 : 3}
          className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white placeholder-gray-500 resize-none focus:outline-none focus:border-purple-500/50 transition-colors"
        />
        <div className="text-right text-xs text-gray-500">{content.length}/500</div>

        {/* Mood selector */}
        <div>
          <label className="text-sm text-gray-400 mb-2 block">Mood (optional)</label>
          <div className="flex flex-wrap gap-2">
            {MOODS.map((m) => (
              <button
                key={m}
                onClick={() => setMood(mood === m ? "" : m)}
                className={`px-3 py-1.5 rounded-full text-sm capitalize transition-all ${
                  mood === m
                    ? "bg-purple-500 text-white"
                    : "bg-white/5 text-gray-400 hover:bg-white/10"
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        {/* Error */}
        {error && (
          <p className="text-red-400 text-sm">{error}</p>
        )}

        {/* Submit */}
        <div className="flex items-center gap-3 pt-2">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-6 py-2.5 bg-gradient-to-r from-[#537fe7] via-[#ab47bc] to-[#d81b60] rounded-xl font-medium hover:scale-105 active:scale-95 transition-transform disabled:opacity-50 disabled:hover:scale-100"
          >
            {loading ? "Posting..." : "Post"}
          </button>
          <button
            onClick={resetForm}
            className="px-4 py-2.5 text-gray-400 hover:text-white transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </MainLayout>
  );
};

export default CreatePostPage;
