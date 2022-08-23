import { AxiosError, AxiosRequestConfig } from 'axios';
import { useCallback, useState } from 'react';
import { httpWrapper } from '../axios/http-wrapper';

type UseRestRequestReturn<T> = [
  boolean,
  boolean,
  string,
  (requestConfig: AxiosRequestConfig) => Promise<T>
];

export const useRestRequest = <T>() => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const makeRequest = useCallback(async (requestConfig: AxiosRequestConfig) => {
    setIsLoading(true);
    setError('');
    try {
      const response = await httpWrapper<T>(requestConfig);

      return response.data;
    } catch (e) {
      if (e instanceof AxiosError) {
        setError(e.message);

        return;
      }

      setError('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const items: UseRestRequestReturn<T> = [
    isLoading,
    !!error,
    error,
    makeRequest,
  ];

  return items;
};
