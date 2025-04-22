import React from "react";
import { useFetchWithCache } from "../hooks/useFetchWithCache";

export function withDataFetching<T>(
  WrappedComponent: React.ComponentType<{ data: T; loading: boolean; error: string }>,
  url: string
) {
  return function Wrapper() {
    const { data, loading, error } = useFetchWithCache(url);
    return <WrappedComponent data={data} loading={loading} error={error} />;
  };
}
