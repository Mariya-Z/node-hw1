import { Groups } from '../db/models/groups.js'
import { db } from '../db/models/index.js';
import { controllerErrorLogger } from '../utils';
import { GroupsService } from './service.js';

const groupsServiceInstance = new GroupsService(Groups);

export const getGroups = (req, res, next) => {
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
}

export const getGroupById = (req, res, next) => {
  const { id } = req.params;
  return groupsServiceInstance.getOneById(id)
    .then(group => {
      if (group) {
        res.status(200).json({
          res: true,
          group: {
            id: group.id,
            name: group.name,
            permissions: group.permissions,
          },
        });
      } else {
        res.status(404).json({
          res: false,
        })
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
}

export const createGroup = (req, res, next) => {
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
}

export const updateGroup = (req, res, next) => {
  const group = { ...req.body };
  const { id } = req.params;
  return groupsServiceInstance.update(group, id)
    .then(result => {
      if (result[0] === 1) {
        return res.status(200).json({
          res: true,
          group: {
            id: id,
            name: group.name,
            permissions: group.permissions,
          }
        })
      } else {
        return res.status(400).json({res: false});
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
}

export const deleteGroup = (req, res, next) => {
  const { id } = req.params;
  return groupsServiceInstance.delete(id)
    .then(result => {
      if (result) {
        return  res.status(200).json({
          res: true,
        })
      } else {
        return res.status(400).json({res: false});
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
}

export const addUsersToGroup = (req, res, next) => {
  const { groupId } = req.params;
  const { userIds } = { ...req.body };

  // TODO - handle already existed couples
  db.sequelize.transaction(t => groupsServiceInstance.addTo(groupId, userIds, t))
    .then(_ => {
      return res.status(200).json({
        res: true,
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
}
