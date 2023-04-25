import create from 'zustand';

const useAuthStore = create((set) => ({
  accessToken: localStorage.getItem("accessToken"),
  setAccessToken: (accessToken) => set({ accessToken }),
  clearAccessToken: () => set({ accessToken: null })
}));

export default useAuthStore;