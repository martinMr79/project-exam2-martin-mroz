import { useEffect } from 'react';

export function useSingleAPI(url, store) {
    const { data, isLoading, hasError, fetchData } = store();
  
    useEffect(() => {
      fetchData(url, false);  // No offset and limit
    }, [fetchData, url]);
  
    return {
      data,
      isLoading,
      hasError,
    };
  }

  