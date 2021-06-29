import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { initDB } from './src/db/models/index.js';
import usersRouter from './src/users/router.js';
import groupsRouter from './src/groups/router.js';
import loginRouter from './src/login/router.js';
import { consoleLogger, serverErrorHandler } from './src/helpers';
import { registerUncaughtException, registerUnhandledRejection } from './src/utils';
import { authGuard } from './src/login/auth-guard.js';

(async function() {
  dotenv.config();
  await initDB();

  const app = express();
  const port = process.env.PORT || 3000;
  
  app.use(cors());
  app.use(express.json());
  app.use(consoleLogger);
  app.use('/authenticate', loginRouter)
  app.use('/users', authGuard, usersRouter);
  app.use('/groups', authGuard, groupsRouter);
  app.use(serverErrorHandler);

  app.listen(port, () => {
    registerUncaughtException();
    registerUnhandledRejection();
    console.log(`Server is running on port: http://localhost:${port}`);
  });
})();
