import express from 'express';
import { createUser, getUsers, deleteUser, getUserById, updateUser } from './controller.js';
import { validateSchema, querySchema, validateRequest } from '../utils/utils.js';

const usersRouter = express.Router();

usersRouter
  .get('/', getUsers)
  .post('/', validateSchema(querySchema), createUser)
  .get('/:id', validateRequest(), getUserById)
  .delete('/:id', validateRequest(), deleteUser)
  .put('/:id', validateRequest(), validateSchema(querySchema), updateUser);

export default usersRouter;