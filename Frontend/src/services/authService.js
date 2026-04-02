import API from "../api/client";

// Login - sends email/username & password to backend
export const loginUser = async ({ identifier, password }) => {
  const res = await API.post("/auth/login", { identifier, password });
  // Backend returns: { message, data: { id, username, email, token } }
  return res.data.data;
};

// Signup - sends username, email & password to backend
export const signupUser = async ({ username, email, password }) => {
  const res = await API.post("/auth/signup", { username, email, password });
  // Backend returns: { message, data: { id, username, email, token } }
  return res.data.data;
};
