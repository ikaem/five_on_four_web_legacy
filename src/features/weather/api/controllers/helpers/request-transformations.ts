// TODO not sure if this belongs here, or if this should be called this

import { NextApiRequestQuery } from 'next/dist/server/api-utils';
import { GetDateWeatherArgs } from '../../data/weather-repository';

export const dateWeatherRequestQueryToArgs = (
  query: NextApiRequestQuery
): GetDateWeatherArgs => {
  // TODO at this point, it wont be undefined becuase it will pass validation
  const lgt =
    typeof query.longitude === 'string'  ? query.longitude : query.longitude?.[0];

  const ltd =
    typeof query.latitude === 'string' ? query.latitude : query.latitude?.[0];

  const dis =
    typeof query.dateInSeconds === 'string'
      ? query.dateInSeconds
      : query.dateInSeconds?.[0];

  // TODO jsut provisionally - should probably throw same error as with validation later
  if(!lgt || !ltd ||!dis) throw new Error("TODO throw better validation error later -a something bad request")

  return {
    longitude: Number.parseFloat(lgt),
    latitude: Number.parseFloat(ltd),
    dateInSeconds: Number.parseInt(dis),
  };
};
