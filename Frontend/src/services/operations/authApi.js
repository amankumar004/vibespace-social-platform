import API, { setAuthToken } from "../api";

export const login = async (credentials) => {
  const res = await API.post("/auth/login", credentials);
  const data = res.data;
  if (data && data.token) {
    setAuthToken(data.token);
  }
  return data;
};

export const signup = async (payload) => {
  const res = await API.post("/auth/signup", payload);
  const data = res.data;
  if (data && data.token) {
    setAuthToken(data.token);
  }
  return data;
};

export default { login, signup };
