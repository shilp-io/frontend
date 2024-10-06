import { useState } from 'react';

interface UseApiResponse<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  execute: (...args: any[]) => Promise<T>;
}

export function useApi<T>(apiFunc: (...args: any[]) => Promise<T>): UseApiResponse<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const execute = async (...args: any[]): Promise<T> => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiFunc(...args);
      setData(result);
      return result;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('An unknown error occurred');
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, execute };
}