import { Dispatch, SetStateAction } from 'react';

// TODO not sure if this belongs here or in some generic types
export type ServiceDataState<T> = {
  data: T;
  errorMessage: string;
  isLoading: boolean;
};

export const INITIAL_SERVICE_DATA_STATE: ServiceDataState<null> = {
  data: null,
  errorMessage: '',
  isLoading: false,
};

// todo HANDLE NULLS - SHOULD HAVE SOME INITIAL STATE
export const getServiceDataStateHandlers = <T>(
  stateSetter: Dispatch<SetStateAction<ServiceDataState<T>>>
) => {
  const setError = (error: string) => {
    stateSetter((prev) => {
      return {
        ...prev,
        errorMessage: error,
      };
    });
  };

  const startLoading = () => {
    stateSetter((prev) => {
      return {
        ...prev,
        isLoading: true,
      };
    });
  };

  const stopLoading = () => {
    stateSetter((prev) => {
      return {
        ...prev,
        isLoading: false,
      };
    });
  };

  const setData = (newData: T) => {
    stateSetter((prev) => {
      return {
        ...prev,
        data: newData,
      };
    });
  };

  return {
    setData,
    setError,
    startLoading,
    stopLoading,
  };
};
