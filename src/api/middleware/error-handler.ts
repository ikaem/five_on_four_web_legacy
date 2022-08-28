import { NextApiRequest, NextApiResponse } from 'next';
import { NextHandler } from 'next-connect';
import { CustomError, ResultResponse } from '../../models/errors/custom-error';

export const errorHandler = (
  err: Error,
  _req: NextApiRequest,
  res: NextApiResponse,
  _next: NextHandler
) => {
  // TODO here we should use some logging solution
  // console.error('Somethig went wrong:', err);
  // TODO probably not good to log it here, becuase services will be used in the getserverside props, and they need to logging errors too? 

  if (err instanceof CustomError) {
    const errors = err.serializeErrors();

    const response: ResultResponse<undefined> = {
      ok: false,
      errors,
    };
    res.status(err.statusCode).json(response);
    return;
  }

  res.status(400).json({
    errors: ['Something went wrong'],
  });
};
