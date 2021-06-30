import express from 'express';
import { UsersController } from './controller.js';
import { validateSchema, querySchema, validateRequest } from '../utils/utils.js';

const usersRouter = express.Router();
const usersController = new UsersController();

usersRouter
  .get('/', usersController.getUsers)
  .post('/', validateSchema(querySchema), usersController.createUser)
  .get('/:id', validateRequest(), usersController.getUserById)
  .delete('/:id', validateRequest(), usersController.deleteUser)
  .put('/:id', validateRequest(), validateSchema(querySchema), usersController.updateUser);

export default usersRouter;