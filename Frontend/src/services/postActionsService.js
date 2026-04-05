import API from "../api/client";

// like a post
export const LikePost = async ({ postId }) => {
  const res = await API.post(`/likes/${postId}`);

  return res.data.data;
};

// unlike a post
export const UnlikePost = async ({ postId }) => {
  const res = await API.delete(`/likes/${postId}`);
  return res.data.data;
};
