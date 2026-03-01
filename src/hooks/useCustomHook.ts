import { useEffect, useRef, useState } from "react";
import { ApiResult } from "../types";

export type UseResourceOptions = {
  immediate?: boolean;
};

export type UseResourceResult<T> = ApiResult<T> & {
  refetch: () => void;
};

export const useResource = <TData, TParams extends readonly unknown[]>(
  key: string,
  fetcher: (...params: TParams) => Promise<TData>,
  params: TParams,
  options?: UseResourceOptions
): UseResourceResult<TData> => {
  const [data, setData] = useState<TData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [reloadIndex, setReloadIndex] = useState<number>(0);

  // PERF-4: store latest fetcher and params in refs so the effect dep array stays stable.
  // Inline functions and array literals passed by callers create new references each render;
  // including them directly in deps would cause an infinite fetch loop.
  const fetcherRef = useRef(fetcher);
  fetcherRef.current = fetcher;
  const paramsRef = useRef(params);
  paramsRef.current = params;

  // Serialize params for value-based comparison instead of reference comparison
  const paramsKey = JSON.stringify(params);

  const shouldRun = options && options.immediate === false ? false : true;

  useEffect(() => {
    if (!shouldRun) {
      return;
    }
    let canceled = false;
    setLoading(true);
    setError(null);
    fetcherRef.current(...paramsRef.current)
      .then((result) => {
        if (!canceled) {
          setData(result);
        }
      })
      .catch((err: unknown) => {
        if (!canceled) {
          const message = err instanceof Error ? err.message : "Unknown error";
          setError(message);
        }
      })
      .finally(() => {
        if (!canceled) {
          setLoading(false);
        }
      });
    return () => {
      canceled = true;
    };
  }, [key, reloadIndex, shouldRun, paramsKey]); // fetcher excluded — always use latest ref

  const refetch = () => {
    setReloadIndex((value) => value + 1);
  };

  return {
    data,
    error,
    loading,
    refetch
  };
};
