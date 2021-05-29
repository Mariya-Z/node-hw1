import express from 'express';
import { createUser, getUsers, deleteUser, getUserById, updateUser } from './controller.js';
import { validateSchema, querySchema } from '../utils/utils.js';

const usersRouter = express.Router();

usersRouter
  .get('/', getUsers)
  .post('/', validateSchema(querySchema), createUser)
  .get('/:id', getUserById)
  .delete('/:id', deleteUser)
  .put('/:id', validateSchema(querySchema), updateUser);

export default usersRouter;