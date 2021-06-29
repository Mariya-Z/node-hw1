import express from 'express';
import { login } from './controller.js';

const loginRouter = express.Router();

loginRouter.post('/', login);

export default loginRouter;
