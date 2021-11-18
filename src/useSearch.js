import { useState, useEffect } from "react";

export default function useSearch(keyword, pageNumber, pageSize) {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setResults([]);
    setHasMore(false);
    setLoading(false);
  }, [keyword]);

  useEffect(() => {
    if (keyword) {
      // Simualted API call
      setLoading(true);
      setTimeout(() => {
        let tmp = [];
        for (let i = 0; i < pageSize; i++) {
          tmp.push(`${keyword} ${pageNumber * pageSize + i}`);
        }
        setResults((results) => [...results, ...tmp]);
        setHasMore(true);
        setLoading(false);
      }, 1000);
    }
  }, [keyword, pageNumber, pageSize]);

  return { results, loading, hasMore };
}
