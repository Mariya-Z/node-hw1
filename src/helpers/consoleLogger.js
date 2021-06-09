const blueFontColor = '\x1b[44m%s\x1b[0m';

export const consoleLogger = (req, res, next) => {
  const { method, query, path } = req;
  const queryParamsString = Object.entries(query)
    .map(([key, value]) => `${key}=${value}`)
    .join();

  console.log(blueFontColor, 
    queryParamsString ? `[logger] Request: ${method} ${path}. Params: ${queryParamsString}`
    : `[logger] Request: ${method} ${path}`);

  return next();
}
