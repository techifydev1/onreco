"use client";

import { useEffect, useRef, useState } from "react";

import { ApiError } from "@/services/api/client";

type Result<T> = { key: number; data: T | null; error: string | null };

type State<T> = {
  data: T | null;
  error: string | null;
  loading: boolean;
  reload: () => void;
};

/**
 * Fetches data on mount. Authenticated app data is fetched from the browser
 * so the proxy can refresh the session and persist the rotated tokens.
 */
export function useApiData<T>(fetcher: () => Promise<T>): State<T> {
  const [result, setResult] = useState<Result<T> | null>(null);
  const [nonce, setNonce] = useState(0);

  const fetcherRef = useRef(fetcher);
  useEffect(() => {
    fetcherRef.current = fetcher;
  }, [fetcher]);

  useEffect(() => {
    let cancelled = false;

    fetcherRef.current()
      .then((data) => {
        if (!cancelled) setResult({ key: nonce, data, error: null });
      })
      .catch((cause: unknown) => {
        if (cancelled) return;
        setResult({
          key: nonce,
          data: null,
          error:
            cause instanceof ApiError
              ? cause.message
              : "Something went wrong loading your data.",
        });
      });

    return () => {
      cancelled = true;
    };
  }, [nonce]);

  const settled = result !== null && result.key === nonce;

  return {
    data: settled ? result.data : null,
    error: settled ? result.error : null,
    loading: !settled,
    reload: () => setNonce((n) => n + 1),
  };
}
