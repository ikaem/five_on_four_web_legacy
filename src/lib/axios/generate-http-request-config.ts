import axios, { AxiosRequestConfig, AxiosRequestHeaders, Method } from 'axios';

export interface GenerateHttpRequestConfigArgs {
  url: string;
  method: Method;
  params?: Record<string, any>;
  data?: any;
}

export const generateHttpRequestConfig = ({
  url,
  method,
  params,
  data,
}: GenerateHttpRequestConfigArgs) => {
  const normalizedMethod = method.toUpperCase() as Method;

  const contentType: AxiosRequestHeaders =
    normalizedMethod === 'POST'
      ? {
          'Content-Type': 'application/json',
        }
      : {};

  const headers = {
    ...contentType,
  };

  return {
    method: normalizedMethod,
    url,
    params: params ?? {},
    headers,
    data,
  };
};
