import { create } from "zustand";
import jwt_decode from "jwt-decode";

export const useAuthStore = create((set) => {
  const accessToken = localStorage.getItem("accessToken") || "";
  const decodedToken = accessToken ? jwt_decode(accessToken) : null;

  const refreshToken = async () => {
    try {
      const response = await fetch("/api/refreshToken", {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to refresh token");
      }

      const { accessToken } = await response.json();

      localStorage.setItem("accessToken", accessToken);

      const decodedToken = jwt_decode(accessToken);
      set({ accessToken, decodedToken });
    } catch (error) {
      console.error(error);
      set({ accessToken: "", decodedToken: null });
    }
  };

  return {
    accessToken,
    decodedToken,
    setAccessToken: (token) => {
      localStorage.setItem("accessToken", token);

      if (token) {
        const decodedToken = jwt_decode(token);
        set({ accessToken: token, decodedToken });
      } else {
        set({ accessToken: "", decodedToken: null });
      }
    },
    setDecodedToken: (decodedToken) => {
      set({ decodedToken });
    },
    clearAccessToken: () => {
      localStorage.removeItem("accessToken");
      set({ accessToken: "", decodedToken: null });
    },
    refreshToken,
  };
});

export default useAuthStore;