import express from 'express';
import dotenv from 'dotenv';
import { initDB } from './src/db/models/index.js';
import usersRouter from './src/users/router.js';

(async function() {
  dotenv.config();
  await initDB();

  const app = express();
  const port = process.env.PORT || 3000;
  
  app.use(express.json());
  app.use('/users', usersRouter);

  
  app.listen(port, () => {
    console.log(`Server is running on port: http://localhost:${port}`);
  })
})();
