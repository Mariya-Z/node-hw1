// import express from 'express';

// import usersRoutes from './src/users/users.js';

require('dotenv').config();

const express = require('express');
const router = require('./src/u/router');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/users', router);

app.listen(port, () => {
  console.log(`Server is running on port: http://localhost:${port}`);
});
