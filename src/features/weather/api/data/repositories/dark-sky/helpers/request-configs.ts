import { generateHttpRequestConfig } from '../../../../../../../lib/axios/generate-http-request-config';
import { envVars } from '../../../../../../../utils/config/env-vars';
import { GetDateWeatherArgs } from '../../../weather-repository';
import { DARK_SKY_URL_API_PATH } from '../constants';

export const createGetDateWeatherRequestConfig = (args: GetDateWeatherArgs) => {
  const url = `${envVars.DARK_SKY_URL}/${DARK_SKY_URL_API_PATH.FORECAST}/${envVars.DARK_SKY_API_KEY}/${args.latitude},${args.longitude},${args.dateInSeconds}`;
  const params = {
    exclude: 'currently,flags',
  };

  const config = generateHttpRequestConfig({
    url,
    params,
    method: 'GET',
  });

  return config;
};
