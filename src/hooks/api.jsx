import { create } from 'zustand';

const createStore = () => create((set, get) => ({ 
  data: [],
  isLoading: false,
  hasError: false,
  hasMore: true,
  offset: 0, 
  limit: 100, 
  clearData: () => set({ data: [], offset: 0, hasMore: true }),
  fetchData: async (url, usePagination = true) => {
    const { isLoading, hasMore, offset, limit } = get();

    if (isLoading || !hasMore) return;

    try {
      set({ isLoading: true, hasError: false });
      const response = usePagination
        ? await fetch(`${url}?offset=${offset}&limit=${limit}`)
        : await fetch(url);
        
      const json = await response.json();
      set(state => ({ 
        data: usePagination ? [...state.data, ...json] : json,
        offset: usePagination ? state.offset + state.limit : state.offset,
        hasMore: json.length > 0,
        isLoading: false,
      }));

    } catch (error) {
      set({ hasError: true, isLoading: false });
    }
  }
}));

export const useHomeStore = createStore();
export const useProfileStore = createStore();
export const useVenuePageStore = createStore();

export const useAPI = (store) => {
  const { fetchData, url, hasMore, isLoading } = store();

  const loadMore = () => {
    if (!isLoading && hasMore) {
      fetchData(url, true);
    }
  };

  return { ...store(), loadMore };
};
