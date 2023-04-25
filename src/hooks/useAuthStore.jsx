import create from 'zustand';

export const useAuthStore = create((set) => ({
  accessToken: localStorage.getItem('accessToken') || '',
  setAccessToken: (token) => set({ accessToken: token }),
  clearAccessToken: () => set({ accessToken: '' })
}));


export default useAuthStore;