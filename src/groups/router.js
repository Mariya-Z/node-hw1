import express from 'express';
import { GroupsController } from './controller.js';
import { validateSchema, permissionSchema, validateRequest } from '../utils/utils.js';

const groupsRouter = express.Router();

const groupsController = new GroupsController();

groupsRouter
  .get('/', groupsController.getGroups)
  .post('/', validateSchema(permissionSchema), groupsController.createGroup)
  .get('/:id', validateRequest(), groupsController.getGroupById)
  .delete('/:id', validateRequest(), groupsController.deleteGroup)
  .put('/:id', validateRequest(), groupsController.updateGroup)
  .post('/:groupId/users/', groupsController.addUsersToGroup);
  
export default groupsRouter;