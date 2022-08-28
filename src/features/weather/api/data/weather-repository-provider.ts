import { httpWrapper } from '../../../../lib/axios/http-wrapper';
import {
  GetDateWeatherArgs,
  WeatherInfo,
  WeatherRepository,
} from './weather-repository';
import { createGetDateWeatherRequestConfig } from './repositories/dark-sky/helpers/request-configs';
import { darkSkyWeatherResponseToWeatherInfo } from './repositories/dark-sky/helpers/transformations';
import { DarkSkyDateWeatherResponse } from './repositories/dark-sky/types';
import { weatherDarkSkyRepository } from './repositories/dark-sky/weather-dark-sky-repository';

class WeatherRepositoryProvider implements WeatherRepository {
  private weatherRepository: WeatherRepository;

  constructor(weatherRepository: WeatherRepository) {
    this.weatherRepository = weatherRepository;
  }

  getOne = async (args: GetDateWeatherArgs): Promise<WeatherInfo> => {
    return await this.weatherRepository.getOne(args);
  };
}

// so in testing, we can just 
/* 
- create new repository with some fake data and the stub it
- then, this contructor would hopefully use that fake one isntead of a real one
*/
export const weatherRepositoryProvider = new WeatherRepositoryProvider(
  weatherDarkSkyRepository
);
