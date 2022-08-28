import { httpWrapper } from '../../../../../../lib/axios/http-wrapper';
import {
  GetDateWeatherArgs,
  WeatherInfo,
  WeatherRepository,
} from '../../weather-repository';
import { createGetDateWeatherRequestConfig } from './helpers/request-configs';
import { darkSkyWeatherResponseToWeatherInfo } from './helpers/transformations';
import { DarkSkyDateWeatherResponse } from './types';

class WeatherDarkSkyRepository implements WeatherRepository {
  getOne = async ({
    latitude,
    longitude,
    dateInSeconds,
  }: GetDateWeatherArgs): Promise<WeatherInfo> => {
    const config = createGetDateWeatherRequestConfig({
      dateInSeconds,
      latitude,
      longitude,
    });

    console.log({config})
    
    const response = await httpWrapper<DarkSkyDateWeatherResponse>(config);
    console.log("in the repo", response)

    // TODO if incorrect data is passed, not all fields will exist - need validation for response too
    const weatherInfo = darkSkyWeatherResponseToWeatherInfo(response.data);

    return weatherInfo;
  };
}

export const weatherDarkSkyRepository = new WeatherDarkSkyRepository()
