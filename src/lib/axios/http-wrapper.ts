import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';

export const httpWrapper = async <T>(
  requestConfig: AxiosRequestConfig
): Promise<AxiosResponse<T>> => {
  const response = await axios(requestConfig);
  
  return response as AxiosResponse<T>;
};
