import { httpWrapper } from '../../../lib/axios/http-wrapper';
import { ResultResponse } from '../../../models/errors/custom-error';
import { UnionResponse } from '../api/controllers/get-weather';
import { WeatherInfo } from '../api/data/weather-repository';
import { createGetWeatherInfoRequestConfig } from './helpers/request-configs';

class WeatherService {
  getWeatherInfo = async (longitude: number, latitude: number, date: Date) => {
    const config = createGetWeatherInfoRequestConfig(longitude, latitude, date);
    // const response = await httpWrapper<ResultResponse<WeatherInfo>>(config);
    const response = await httpWrapper<UnionResponse<WeatherInfo>>(config);

    return response.data;
  };
}

export const weatherService = new WeatherService();
