import { WeatherInfo } from '../../../weather-repository';
import { DarkSkyDateWeatherResponse } from '../types';

export const darkSkyWeatherResponseToWeatherInfo = (
  response: DarkSkyDateWeatherResponse
) => {
  const dailyData = response.daily.data[0];

  const weatherInfo: WeatherInfo = {
    latitude: response.latitude,
    longitude: response.longitude,
    timezone: response.timezone,
    time: dailyData.time,
    summary: dailyData.summary,
    icon: dailyData.icon,
    precipitation: dailyData.precipType,
    temperature: dailyData.temperatureMax,
    windSpeed: dailyData.windSpeed,
  };

  return weatherInfo;
};
