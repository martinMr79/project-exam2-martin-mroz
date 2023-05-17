import { useEffect } from 'react';
import {create} from 'zustand';

// Create a store factory
const createStore = () => create((set) => ({
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


export const useHomeStore = createStore();
export const useProfileStore = createStore();
export const useVenuePageStore = createStore();

export function useAPI(url, store) {
  const { data, isLoading, hasError, fetchData } = store();

  useEffect(() => {
    fetchData(url);
  }, [fetchData, url]);

  return {
    data,
    isLoading,
    hasError,
  };
}
