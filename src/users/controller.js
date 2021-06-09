import { Users } from '../db/models/users.js';
import { controllerErrorLogger } from '../utils';
import { UsersService } from './service.js';

const usersServiceInstance = new UsersService(Users);

export const getUsers = (req, res, next) => {
  if (Object.keys(req.query).length) {
    return searchUsers(req, res, next);
  }

  return usersServiceInstance.getAll()
    .then(users => res.status(200).json(users))
    .catch(error => {
      controllerErrorLogger({
        controllerName: 'UserController',
        methodName: 'getAll',
        args: req.query,
        error: error,
      });
      next(error);
    });
}

export const getUserById = (req, res, next) => {
  const { id } = req.params;
  return usersServiceInstance.getOneById(id)
    .then(user => {
      if (user) {
        res.status(200).json({
          res: true,
          user: {
            id: user.id,
            login: user.login,
            age: user.age,
          },
        });
      } else {
        // TODO - controllerErrorLogger?
        res.status(404).json({
          res: false,
        })
      }
    })
    .catch(error => {
      controllerErrorLogger({
        controllerName: 'UserController',
        methodName: 'getUserById',
        args: req.query,
        error: error,
      });
      next(error);
    });
}

export const createUser = (req, res, next) => {
  const user = { ...req.body };
  return usersServiceInstance.create(user)
    .then(user => res.status(201).json({
      id: user.id,
      login: user.login,
      age: user.age,
    }))
    .catch(error => {
      controllerErrorLogger({
        controllerName: 'UserController',
        methodName: 'createUser',
        args: req.query,
        error: error,
      });
      next(error);
    });
};

// TODO - what happens whit UserGroup table on delete?
export const deleteUser = (req, res, next) => {
  const { id } = req.params;
  return usersServiceInstance.delete(id)
    .then(result => {
      if (result[0] === 1) {
        return  res.status(200).json({
          res: true,
        })
      } else {
        return res.status(400).json({res: false});
      }
    })
    .catch(error => {
      controllerErrorLogger({
        controllerName: 'UserController',
        methodName: 'deleteUser',
        args: req.query,
        error: error,
      });
      next(error);
    });
}

export const updateUser = (req, res, next) => {
  const user = { ...req.body };
  const { id } = req.params;
  return usersServiceInstance.update(user, id)
    .then(result => {
      if (result[0] === 1) {
        return  res.status(200).json({
          res: true,
          user: {
            id: id,
            login: user.login,
            age: user.age,
          }
        })
      } else {
        // TODO - 400 OR 404
        return res.status(400).json({res: false});
      }
    })
    .catch(error => {
      controllerErrorLogger({
        controllerName: 'UserController',
        methodName: 'updateUser',
        args: req.query,
        error: error,
      });
      next(error);
    });
}

export const searchUsers = (req, res, next) => {
  const { start_with, limit } = req.query;
  return usersServiceInstance.search(start_with, limit)
    .then(data => res.status(200).json(data))
    .catch(error => {
      controllerErrorLogger({
        controllerName: 'UserController',
        methodName: 'searchUsers',
        args: req.query,
        error: error,
      });
      next(error);
    });
}
