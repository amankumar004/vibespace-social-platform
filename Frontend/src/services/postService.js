import API from "../api/client";

// Create a new text post
export const createTextPost = async ({ content, mood }) => {
  const res = await API.post("/posts", { type: "text", content, mood });
  return res.data.data;
};

// Create a new image post (multipart form data)
export const createImagePost = async ({ image, content, mood }) => {
  const formData = new FormData();
  formData.append("type", "image");
  formData.append("image", image);
  if (content) formData.append("content", content);
  if (mood) formData.append("mood", mood);

  const res = await API.post("/posts", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data.data;
};

// Get all posts
export const getAllPosts = async (mood) => {
  const params = mood ? { mood } : {};
  const res = await API.get("/posts", { params });
  return res.data.data;
};
