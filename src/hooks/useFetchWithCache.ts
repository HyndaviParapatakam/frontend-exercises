import { useEffect, useMemo, useState, useCallback } from "react";

const cache: Record<string, any> = {};

export function useFetchWithCache(url: string) {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    if (!url || !url.startsWith("http")) return;

    if (cache[url]) {
      setData(cache[url]);
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(url);
      if (!response.ok) throw new Error("Network error");
      const result = await response.json();
      cache[url] = result;
      setData(result);
      setError("");
    } catch (err: any) {
      setError(err.message || "Error fetching data");
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return useMemo(() => ({ data, loading, error }), [data, loading, error]);
}
