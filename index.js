import express from 'express';

import usersRoutes from './src/users/users.js';

const app = express();
const PORT = 3000;

app.use(express.json());

app.use('/users', usersRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port: http://localhost:${PORT}`);
});