import { create } from "zustand";
import { axioInstance } from "../lib/axios.js";

export const useAuthStore = create((set) => {
  authUser: null;
  isLoggingIn: false;
  isSignIngUp: false;
  isUpdatingProfile: false;

  isCheckingAuth: false;

  checkAuth: async () => {
    try {
      const res = await axioInstance("/auth/check");
      set({ authUser: res.data });
    } catch (error) {
      console.log(error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  };
});
