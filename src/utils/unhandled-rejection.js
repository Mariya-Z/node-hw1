import { logger } from './logger'

export const registerUnhandledRejection = () => {
  process.on('unhandledRejection', (reason, promise) => {
    logger.log({
      level: 'error',
      message: `Unhandled Rejection at Promise, reason - ${reason}}`,
    });
  });
};
