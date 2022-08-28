import { getWeather } from '../../features/weather/api/controllers/get-weather';
import { routeHandler } from '../../lib/next-connext/route-handler';

const route = routeHandler().get(getWeather);
export default route;
