import API from "../api/client";

// Get feed posts (posts from followed users + public posts)
export const getFeedPosts = async ({ page = 1, limit = 10 }) => {
  const res = await API.get("/feed", {
    params: { page, limit },
  });
  return res.data.data;
};
