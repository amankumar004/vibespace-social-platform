import { create } from "zustand";

const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem("token") || null,

  setAuth: (data) => {
    if (!data) return;
    localStorage.setItem("token", data.token);
    set({ user: data.user || null, token: data.token });
  },

  logout: () => {
    localStorage.removeItem("token");
    set({ user: null, token: null });
  },
}));

export default useAuthStore;
