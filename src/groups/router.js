import express from 'express';
import { addUsersToGroup, createGroup, deleteGroup, getGroupById, getGroups, updateGroup } from './controller.js';
import { validateSchema, permissionSchema } from '../utils/utils.js';

const groupsRouter = express.Router();

groupsRouter
  .get('/', getGroups)
  .post('/', validateSchema(permissionSchema), createGroup)
  .get('/:id', getGroupById)
  .delete('/:id', deleteGroup)
  .put('/:id', updateGroup)
  .post('/:groupId/users/', addUsersToGroup);
  
export default groupsRouter;