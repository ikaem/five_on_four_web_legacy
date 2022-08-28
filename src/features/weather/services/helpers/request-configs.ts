import { APP_API_PATH } from "../../../../api/constants";
import { generateHttpRequestConfig } from "../../../../lib/axios/generate-http-request-config";
import { envVars } from "../../../../utils/config/env-vars";

export const createGetWeatherInfoRequestConfig = (
  longitude: number,
  latitude: number,
  date: Date
) => {
  const dateInSeconds = Math.round(date.getTime() / 1000);

  const config = generateHttpRequestConfig({
    url: `${envVars.API_URL}/${APP_API_PATH.WEATHER}`,
    params: {
      longitude,
      latitude,
      dateInSeconds,
    },
    method: 'get',
  });

  return config;
};
