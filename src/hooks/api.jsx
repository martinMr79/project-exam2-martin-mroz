import create from "zustand";
import { useEffect } from 'react';

const useAPIStore = create((set) => ({
  data: [],
  isLoading: false,
  hasError: false,
  fetchData: async (url) => {
    try {
      set({ isLoading: true, hasError: false });
      const response = await fetch(url);
      const json = await response.json();
      set({ data: json });
    } catch (error) {
      set({ hasError: true });
    } finally {
      set({ isLoading: false });
    }
  },
}));

export function useAPI(url) {
  const { data, isLoading, hasError, fetchData } = useAPIStore();

  useEffect(() => {
    fetchData(url);
  }, [fetchData, url]);

  return {
    data,
    isLoading,
    hasError,
  };
}

