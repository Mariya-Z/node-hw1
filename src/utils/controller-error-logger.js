import { logger } from './logger'

export const controllerErrorLogger = ({controllerName, methodName, args, error}) => {
  logger.log(
    'error',
    '"%s" error. Method name: "%s", arguments: "%o", message: "%s", stacktrace: "%s"',
    controllerName,
    methodName,
    args,
    error.message,
    error.stack ? error.stack : ''
  )
}
