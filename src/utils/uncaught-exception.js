import { logger } from './logger'

export const registerUncaughtException = () => {
  process.on('uncaughtException', (error) => {
    logger.log({
      level: 'error',
      message: `Uncaught Exception ${error.message}`
    });
  });
}
