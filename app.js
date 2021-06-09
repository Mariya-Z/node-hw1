import express from 'express';
import dotenv from 'dotenv';
import { initDB } from './src/db/models/index.js';
import usersRouter from './src/users/router.js';
import groupsRouter from './src/groups/router.js';
import { consoleLogger, serverErrorHandler } from './src/helpers';
import { registerUncaughtException, registerUnhandledRejection } from './src/utils';

(async function() {
  dotenv.config();
  await initDB();

  const app = express();
  const port = process.env.PORT || 3000;
  
  app.use(express.json());
  app.use(consoleLogger);
  app.use('/users', usersRouter);
  app.use('/groups', groupsRouter);
  app.use(serverErrorHandler);

  app.listen(port, () => {
    registerUncaughtException();
    registerUnhandledRejection();
    console.log(`Server is running on port: http://localhost:${port}`);
  })
})();
