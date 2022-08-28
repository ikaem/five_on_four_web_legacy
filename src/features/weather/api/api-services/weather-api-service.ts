import { ResultResponse } from '../../../../models/errors/custom-error';
import {
  GetDateWeatherArgs,
  WeatherInfo,
  WeatherRepository,
} from '../data/weather-repository';
import { weatherRepositoryProvider } from '../data/weather-repository-provider';

// TODO exporting because might need in testing to have some fake one
export class WeatherApiService {
  private weatherRepositoryProvider: WeatherRepository;

  constructor(weatherRepositoryProvider: WeatherRepository) {
    this.weatherRepositoryProvider = weatherRepositoryProvider;
  }

  // TODO so each function should return ok, value, error type
  getWeatherForDate = async (
    args: GetDateWeatherArgs
  ): Promise<ResultResponse<WeatherInfo>> => {
    try {
      const response = await this.weatherRepositoryProvider.getOne(args);

      return {
        // ok: true,
        type: 'success',
        value: response,
      };
    } catch (e) {
      // TODO log error here to get proper error proper

      const message =
        e instanceof Error ? e.message : 'Failed to fetch weather info';
      console.error(message);

      return {
        // ok: false,
        type: 'failure',
        // TODO make these constants in the app, so can access them from all page nicely
        errors: [message],
      };
    }
  };
}

// TODO in testing, we could just stub possibly the value returned by this with a new one that is returned by generating some mock weather service
export const weatherService = new WeatherApiService(weatherRepositoryProvider);
