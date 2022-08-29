import { NextApiHandler, NextApiRequest } from 'next';
import { weatherService } from '../api-services/weather-api-service';
import { GetDateWeatherError } from '../models/errors/get-date-weather-error';
import { dateWeatherRequestQueryToArgs } from './helpers/request-transformations';

// TODO this will need validation too
export const getWeather: NextApiHandler = async (req: NextApiRequest, res) => {
  console.log('are we here');
  // const { longitude, latitude, dateInSeconds } = req.query;
  const args = dateWeatherRequestQueryToArgs(req.query);

  const result = await weatherService.getWeatherForDate(args);

  if (result.errors) throw new GetDateWeatherError(result.errors[0]);

  res.status(200).json(result);
};

// TODO test
export const testSomething = (num: number) => {
  console.log(num);
};

// TODO test
export type SuccessResponse<T> = {
  // ok: true;
  type: 'success';
  value: T;
};

export type FailureResponse = {
  // ok: true;
  type: 'failure';
  errors: string[];
};

// TODO rename this to result response
export type UnionResponse<T> = SuccessResponse<T> | FailureResponse;
