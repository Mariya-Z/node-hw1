import express from 'express';
import validation from 'express-joi-validation';

import { getUsers, createUser, getUser, deleteUser, updateUser, querySchema, querySchemaForUpdate } from './usersController.js';
import { validateSchema } from '../utils/utils.js';
import Joi from 'joi';

const router = express.Router();
const validator = validation.createValidator({});

export default router;

router.get('/', getUsers);

router.post('/', validateSchema(querySchema), createUser); 

router.get('/:id', getUser);

router.delete('/:id', deleteUser);

router.patch('/:id', validateSchema(querySchemaForUpdate), updateUser);

