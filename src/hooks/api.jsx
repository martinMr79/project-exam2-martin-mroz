import { useState, useEffect } from "react";

export function useAPI(url) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        setHasError(false);
        const response = await fetch(url);
        console.log(response)
        const json = await response.json();
        setData(json);
      } catch (error) {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [url]);

  return {
    data,
    isLoading,
    hasError
  };
}
