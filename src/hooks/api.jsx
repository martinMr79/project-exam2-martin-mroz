import { useEffect } from 'react';
import {create} from 'zustand';

// Create a store factory
const createStore = () => create((set, get) => ({ 
  data: [],
  isLoading: false,
  hasError: false,
  offset: 0, // new state to track offset
  limit: 100, // new state to set limit
  fetchData: async (url) => {
    try {
      set({ isLoading: true, hasError: false });
      const { offset, limit } = get(); // get current offset and limit
      const response = await fetch(`${url}?offset=${offset}&limit=${limit}`); // fetch data with offset and limit
      const json = await response.json();
      set(state => ({ data: [...state.data, ...json], offset: state.offset + state.limit })); // merge new data and increase offset
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

  const loadMore = () => {
    fetchData(url);
  };

  useEffect(() => {
    fetchData(url);
  }, [fetchData, url]);

  console.log({ data, isLoading, hasError });

  return {
    data,
    isLoading,
    hasError,
    loadMore,
  };
}
