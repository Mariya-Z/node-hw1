import { logger } from '../utils';

export const serverErrorHandler = (error, req, res, next) => {
  logger.log('error', error.stack);

  return res.status(500).json({
    error: 'Internal Server Error',
    message: error.message,
  });
}
