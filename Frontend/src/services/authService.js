import API from "../api/client";

// Login - sends email & password to backend
export const loginUser = async ({ email, password }) => {
  const res = await API.post("/auth/login", { email, password });
  // Backend returns: { message, data: { id, username, email, token } }
  return res.data.data;
};

// Signup - sends username, email & password to backend
export const signupUser = async ({ username, email, password }) => {
  const res = await API.post("/auth/signup", { username, email, password });
  // Backend returns: { message, data: { id, username, email, token } }
  return res.data.data;
};
