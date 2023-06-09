import { create } from "zustand";
import jwt_decode from "jwt-decode";

export const useAuthStore = create((set) => {
  const accessToken = localStorage.getItem("accessToken") || "";
  const decodedToken = accessToken ? jwt_decode(accessToken) : null;

  return {
    accessToken,
    decodedToken,
    bookings: [],
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
    setBookings: (bookings) => {
      set({ bookings });
    },
    clearAccessToken: () => {
      localStorage.removeItem("accessToken");
      set({ accessToken: "", decodedToken: null, bookings: [] });
    },
  };
});

export default useAuthStore;