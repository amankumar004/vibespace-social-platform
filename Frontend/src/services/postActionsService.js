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

// create a comment
export const CreateComment = async ({ postId, content }) => {
  const res = await API.post(`/comments/${postId}`, { content });
  return res.data.data;
};

// delete a comment
export const DeleteComment = async ({ commentId }) => {
  const res = await API.delete(`/comments/${commentId}`);
  return res.data.data;
};

// get comments for a post
export const GetPostComments = async ({ postId, page = 1, limit = 10 }) => {
  const res = await API.get(`/comments/${postId}?page=${page}&limit=${limit}`);
  return res.data.data;
};
