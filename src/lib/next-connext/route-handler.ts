import nextConnect from 'next-connect';
import { errorHandler } from '../../api/middleware/error-handler';

// TODO not sure if this is ok - check next connect documentation - maybe should use some factory
// export const routeHandler = nextConnect({
//   onError: errorHandler
// })

// TODO this could be ok, but i think above is fine too - but we might be mutating the isntance , and then if we reuse, mibht lead to unwatned behavior
export const routeHandler = () =>
  nextConnect({
    onError: errorHandler,
  });
