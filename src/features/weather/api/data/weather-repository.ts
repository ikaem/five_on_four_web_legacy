export abstract class WeatherRepository {
  // TODO maybe not needed this one
  // abstract getTodayWeather(): Promise<WeatherInfo>;
  abstract getOne(args: GetDateWeatherArgs): Promise<WeatherInfo>;
}

// TODO will need to be moved to models - not types, but nodels
export type WeatherInfo = {
  latitude: number;
  longitude: number;
  // TODO timezones should probably be an enum defined in the app somewhere, too
  timezone: string;
  time: number;
  summary: string;
  icon: string;
  precipitation : string;
  temperature: number;
  windSpeed: number;
};

// TODO again, move somewhere
export type GetDateWeatherArgs = {
  latitude: number;
  longitude: number;
  dateInSeconds: number;
};
