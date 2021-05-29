import { Users } from '../db/models/users.js';
import { UsersService } from './service.js';

const usersServiceInstance = new UsersService(Users);

export const getUsers = (req, res) => {
  if (Object.keys(req.query).length) {
    return searchUsers(req, res);
  }

  return usersServiceInstance.getAll()
    .then(users => res.status(200).json(users))
    .catch(error => res.status(500).json(error));
}

export const getUserById = (req, res) => {
  const { id } = req.params;
  return usersServiceInstance.getOneById(id)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({
          error: `User with id ${id} is not found`,
        })
      }
    })
    .catch(error => res.status(500).json(error));
}

export const createUser = (req, res) => {
  const user = { ...req.body };
  return usersServiceInstance.create(user)
    .then(user => res.status(201).json({
      id: user.id,
      login: user.login,
      age: user.age,
    }))
    .catch(error => res.status(500).json(error));
};

export const deleteUser = (req, res) => {
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
    .catch(error => res.status(500).json(error));
}

export const updateUser = (req, res) => {
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
    .catch(error => res.status(500).json(error))

}

export const searchUsers = (req, res) => {
  const { start_with, limit } = req.query;
  return usersServiceInstance.search(start_with, limit)
    .then(data => res.status(200).json(data))
    .catch(error => res.status(500).json(error));
}