import { Groups } from '../db/models/groups.js'
import { db } from '../db/models/index.js';
import { controllerErrorLogger } from '../utils';
import { GroupsService } from './service.js';

export const groupsServiceInstance = new GroupsService(Groups);

export class GroupsController {
  getGroups = (req, res, next) => {
    return groupsServiceInstance.getAll()
      .then(users => res.status(200).json(users))
      .catch(error => {
        controllerErrorLogger({
          controllerName: 'GroupController',
          methodName: 'getGroups',
          args: req.query,
          error: error,
        });
        next(error);
      });
  };

  getGroupById = (req, res, next) => {
    const { id } = req.params;
    return groupsServiceInstance.getOneById(id)
      .then(group => {
        if (group) {
          res.status(200).json({
            success: true,
            group: {
              id: group.id,
              name: group.name,
              permissions: group.permissions,
            },
          });
        } else {
          res.status(400).json({
            success: false,
            message: `No group with id ${id}`,
          });
        }
      })
      .catch(error => {
        controllerErrorLogger({
          controllerName: 'GroupController',
          methodName: 'getGroupById',
          args: req.query,
          error: error,
        });
        next(error);
      });
  };

  createGroup = (req, res, next) => {
    const group = { ...req.body };
    return groupsServiceInstance.create(group)
      .then(group => res.status(201).json({
        id: group.id,
        name: group.name,
        permissions: group.permissions,
      }))
      .catch(error => {
        controllerErrorLogger({
          controllerName: 'GroupController',
          methodName: 'createGroup',
          args: req.query,
          error: error,
        });
        next(error);
      });
  };

  updateGroup = (req, res, next) => {
    const group = { ...req.body };
    const { id } = req.params;
    return groupsServiceInstance.update(group, id)
      .then(result => {
        if (result[0] === 1) {
          return res.status(200).json({
            success: true,
            group: {
              id: id,
              name: group.name,
              permissions: group.permissions,
            }
          })
        } else {
          return res.status(400).json({
            success: false,
            message: `No group with id ${id}`,
          });
        }
      })
      .catch(error => {
        controllerErrorLogger({
          controllerName: 'GroupController',
          methodName: 'updateGroup',
          args: req.query,
          error: error,
        });
        next(error);
      });
  };

  deleteGroup = (req, res, next) => {
    const { id } = req.params;
    return groupsServiceInstance.delete(id)
      .then(result => {
        if (result) {
          return  res.status(200).json({
            success: true,
          })
        } else {
          return res.status(400).json({
            success: false,
            message: `No group with id ${id}`,
          });
        }
      })
      .catch(error => {
        controllerErrorLogger({
          controllerName: 'GroupController',
          methodName: 'deleteGroup',
          args: req.query,
          error: error,
        });
        next(error);
      });
  };

  addUsersToGroup = (req, res, next) => {
    const { groupId } = req.params;
    const { userIds } = { ...req.body };
  
    db.sequelize.transaction(t => groupsServiceInstance.addTo(groupId, userIds, t))
      .then(_ => {
        return res.status(200).json({
          success: true,
        })
      })
      .catch(error => {
        controllerErrorLogger({
          controllerName: 'GroupController',
          methodName: 'addUsersToGroup',
          args: req.query,
          error: error,
        });
        next(error);
      });
  };
}
