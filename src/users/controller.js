import { Users } from '../db/models/users.js';
import { controllerErrorLogger } from '../utils';
import { UsersService } from './service.js';

export const usersServiceInstance = new UsersService(Users);

export class UsersController {
  getUsers = (req, res, next) => {
    if (Object.keys(req.query).length) {
      return this.searchUsers(req, res, next);
    };
  
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
  };

  getUserById = (req, res, next) => {
    const { id } = req.params;
    return usersServiceInstance.getOneById(id)
      .then(user => {
        if (user) {
          res.status(200).json({
            success: true,
            user: {
              id: user.id,
              login: user.login,
              age: user.age,
            },
          });
        } else {
          controllerErrorLogger({
            controllerName: 'UserController',
            methodName: 'getUserById',
            args: req.query,
            error: {
              message: `No user with id ${id}`,
            }
          });
          res.status(400).json({
            success: false,
            message: `No user with id ${id}`,
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
  };

  createUser = (req, res, next) => {
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

  deleteUser = (req, res, next) => {
  const { id } = req.params;
  return usersServiceInstance.delete(id)
    .then(result => {
      if (result[0] === 1) {
        return  res.status(200).json({
          success: true,
        })
      } else {
        return res.status(400).json({
          success: false,
          message: `No user with id ${id}`,
        });
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
  };

  updateUser = (req, res, next) => {
  const user = { ...req.body };
  const { id } = req.params;
  return usersServiceInstance.update(user, id)
    .then(result => {
      if (result[0] === 1) {
        return  res.status(200).json({
          success: true,
          user: {
            id: id,
            login: user.login,
            age: user.age,
          }
        })
      } else {
        return res.status(400).json({
          success: false,
          message: `No user with id ${id}`,
        });
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
  };

  searchUsers = (req, res, next) => {
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
  };
}
