import { useEffect, useState } from 'react';
import {create} from 'zustand';

// Create a store factory
const createStore = () => create((set, get) => ({ 
  data: [],
  isLoading: false,
  hasError: false,
  offset: 0, // new state to track offset
  limit: 100, // new state to set limit
  fetchData: async (url, usePagination = true) => {
    try {
      set({ isLoading: true, hasError: false });
      const { offset, limit } = get();
      const response = usePagination
        ? await fetch(`${url}?offset=${offset}&limit=${limit}`)
        : await fetch(url);
        
      const json = await response.json();
      set(state => ({ 
        data: usePagination ? [...state.data, ...json] : json,
        offset: usePagination ? state.offset + state.limit : state.offset 
      }));
    } catch (error) {
      set({ hasError: true });
    } finally {
      set({ isLoading: false });
    }
  }
}));



export const useHomeStore = createStore();
export const useProfileStore = createStore();
export const useVenuePageStore = createStore();

export const useAPI = (store) => {
  const { data, isLoading, isError, fetchData } = store();

  const loadMore = () => {
    fetchData(null, true);
  };

  return { data, isLoading, isError, loadMore };
};
