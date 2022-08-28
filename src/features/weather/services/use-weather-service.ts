import { useCallback, useMemo, useState } from 'react';
import {
  getServiceDataStateHandlers,
  INITIAL_SERVICE_DATA_STATE,
  ServiceDataState,
} from '../../../utils/helpers/get-service-data-state-handlers';
import { testSomething, UnionResponse } from '../api/controllers/get-weather';
import { WeatherInfo } from '../api/data/weather-repository';
import { weatherService } from './weather-service';

export const useWeatherSergice = () => {
  const [weatherInfoState, setWeatherInfoState] = useState<
    ServiceDataState<WeatherInfo | null>
  >(INITIAL_SERVICE_DATA_STATE);

  setWeatherInfoState((prev) => {
    return {
      ...prev,
    };
  });

  const weatherStateHandlers = useMemo(() => {
    return getServiceDataStateHandlers(setWeatherInfoState);
  }, []);

  const handleLoadWeatherInfo = useCallback(
    async (longitude: number, latitude: number, date: Date) => {
      weatherStateHandlers.setError('');
      weatherStateHandlers.startLoading();

      try {
        const result = await weatherService.getWeatherInfo(
          longitude,
          latitude,
          date
        );

        if (result.type === 'failure') {
          // TODO maybe there is no need to errors to be a list - maybe jsut one error is enough to send back? and let logger log all errors?
          throw new Error(result.errors[0]);
        }

        weatherStateHandlers.setData(result.value);
      } catch (e) {
        const message =
          e instanceof Error
            ? e.message
            : 'There was an error loading weather info';

        weatherStateHandlers.setError(message);
      } finally {
        weatherStateHandlers.stopLoading();
      }
    },
    [weatherStateHandlers]
  );

  return {
    weatherInfoState,
  };
};
