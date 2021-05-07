import Joi from 'joi';
import { v4 as uuid } from 'uuid';

import { Users } from '../db/models/users';


let users = [
  {
    id: '1',
    login: 'Tom',
    password: 'Welcome1',
    age: 10,
    isDeleted: false
  },
  {
    id: '2',
    login: 'Jerry',
    password: 'Welcome2',
    age: 3,
    isDeleted: true
  },
  {
    id: '3',
    login: 'Tomas',
    password: 'Welcome3',
    age: 11,
    isDeleted: false
  }
];

export const querySchema  = Joi.object().keys({
  login: Joi.string().required(),
  password: Joi.string().pattern(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/).required(),
  age: Joi.number().greater(4).less(130).required(),
  isDeleted: Joi.boolean().required(),
});

export const querySchemaForUpdate  = Joi.object().keys({
  login: Joi.string(),
  password: Joi.string().pattern(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/),
  age: Joi.number().greater(4).less(130),
  isDeleted: Joi.boolean(),
});

export const getUsers = (req, res) => {
  if (Object.keys(req.query).length) {
    searchUsers(req, res);
  }
  res.send(users.filter((user) => !user.isDeleted));
}

export const create = (req, res) => {
  return Users
    .create({
      // title: req.body.title,
      login: req.body.login,
      password: req.body.password,
      age: req.body.age,
      // isDeleted: DataTypes.BOOLEAN
    })
    .then(users => res.status(201).send(users))
    .catch(error => res.status(400).send(error));
}

export const createUser = (req, res) => {
  const user = {
    ...req.body,
    id: uuid(),
  };
  users.push(user);
  res.status(201).json({
    message: `User with id ${user.id} has been added to the database`
  });
}

export const getUser = (req, res) => {
  const { id } = req.params;
  const foundUser = users.find((user) => user.id === id);
  if (foundUser === undefined) {
    res.status(404).json({
      error: `User with id ${id} is not found`
    })
  }
  res.send(foundUser);
}

export const deleteUser = (req, res) => {
  const { id } = req.params;
  
  const updatedUsers = users.reduce((result, user) => {
    if (user.id === id && !user.isDeleted) {
      result.users.push({
        ...user,
        isDeleted: true,
      });
      result.isUpdated = true;
      return result;
    }
    result.users.push(user);
    return result;
  }, {
    users: [],
    isUpdated: false,
  });

  if (!updatedUsers.isUpdated) {
    res.status(404).json({
      error: `User with id ${id} is not found`
    });
  }

  users = updatedUsers.users;

  res.json({
    message: `User with the id ${id} has been deleted from the database`,
  });
}

export const updateUser = (req, res) => {
  const { id } = req.params;
  const { login, password, age } = req.body;

  const updatedUser = users.find((user) => user.id === id && !user.isDeleted);

  if (!updatedUser) {
    res.status(404).json({
      error: `User with id ${id} is not found`
    });
  }

  if (login) {
    updatedUser.login = login;
  }

  if (password) {
    updatedUser.password = password;
  }

  if (age) {
    updatedUser.age = age;
  }

  users.map((user) => {
    if (user.id === id) {
      return updatedUser;
    }
    return user;
  });

  res.json({message: `User with the id ${id} has been updated`}); // status(204)
}

// ?start_with=To&limit=1
export const searchUsers = (req, res) => {
  const { start_with, limit } = req.query;
  let matches = [];

  users.forEach((user) => {
    if (user.login.indexOf(start_with) !== -1) {
      matches.push(user.login);
    };
  });

  res.json({
    users: matches.slice(0, limit),
    totalAmount: matches.length,
  });
}

