import { useEffect } from 'react';

export function useSingleAPI(url, store, deps = []) {
  const { data, isLoading, hasError, fetchData, clearData } = store();

  useEffect(() => {
    clearData();
    fetchData(url, false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, ...deps]); 

  return {
    data,
    isLoading,
    hasError,
  };
}








  