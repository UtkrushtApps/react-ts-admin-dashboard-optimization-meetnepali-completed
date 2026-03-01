import { useEffect, useState } from "react";
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

  const shouldRun = options && options.immediate === false ? false : true;

  useEffect(() => {
    if (!shouldRun) {
      return;
    }
    let canceled = false;
    setLoading(true);
    setError(null);
    fetcher(...params)
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
  }, [key, fetcher, reloadIndex, shouldRun, params]);

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
