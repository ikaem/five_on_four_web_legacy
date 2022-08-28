import { generateHttpRequestConfig } from '../../../../lib/axios/generate-http-request-config';
import { envVars } from '../../../../utils/config/env-vars';

export const createGetMatchesRequestConfig = () => {
  const config = generateHttpRequestConfig({
    url: `${envVars.API_URL}/matches`,
    method: 'get',
  });

  return config;
};

// TODO temp
export const createGetFakeMatchesRequestConfig = () => {
  const config = generateHttpRequestConfig({
    url: `https://swapi.dev/api/people`,
    method: 'get',
  });

  return config;
};

export const createGetFakeMatchRequestConfig = (matchId: string) => {
  const config = generateHttpRequestConfig({
    url: `https://swapi.dev/api/people/${matchId}`,
    method: 'get',
  });

  return config;
};
