import create from 'zustand';
import jwt_decode from "jwt-decode";

export const useAuthStore = create((set) => ({
  accessToken: localStorage.getItem('accessToken') || '',
  decodedToken: null,
  setAccessToken: (token) => {
    set({ accessToken: token });
    if (token) {
      const decodedToken = jwt_decode(token);
      set({ decodedToken });
    } else {
      set({ decodedToken: null });
    }
  },
  clearAccessToken: () => {
    set({ accessToken: '' });
    set({ decodedToken: null });
  }
}));

export default useAuthStore;