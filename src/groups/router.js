import express from 'express';
import { addUsersToGroup, createGroup, deleteGroup, getGroupById, getGroups, updateGroup } from './controller.js';
import { validateSchema, permissionSchema, validateRequest } from '../utils/utils.js';

const groupsRouter = express.Router();

groupsRouter
  .get('/', getGroups)
  .post('/', validateSchema(permissionSchema), createGroup)
  .get('/:id', validateRequest(), getGroupById)
  .delete('/:id', validateRequest(), deleteGroup)
  .put('/:id', validateRequest(), updateGroup)
  // TODO - validator
  .post('/:groupId/users/', addUsersToGroup);
  
export default groupsRouter;