import { create } from "zustand";
import axios from "axios";

const URL = "http://localhost:8080/api/auth";

axios.defaults.withCredentials = true;

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  error: null,
  isLoading: false,
  isCheckingAuth: true,

  register: async (name, email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${URL}/register`, {
        name,
        email,
        password,
      });
      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.response.data.message || "회원가입 에러",
        isLoading: false,
      });
      throw error;
    }
  },

  verifyEmail: async (code) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${URL}/verify-email`, {
        code,
      });
      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.response.data.message || "이메일 인증 에러",
        isLoading: false,
      });
      throw error;
    }
  },
}));
