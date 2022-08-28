export interface DarkSkyDateWeatherResponse {
  latitude: number;
  longitude: number;
  timezone: string;
  daily: {
    data: DarkSkyDaily[];
  };
}

interface DarkSkyDaily {
  time: number;
  summary: string;
  icon: string;
  precipType: string;
  windSpeed: number;
  temperatureMax: number;
}
