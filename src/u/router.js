
const express = require('express');
const createUser = require('./controller').createUser;
const getUsers = require('./controller').getUsers;
const deleteUser = require('./controller').deleteUser;

const router = express.Router();

router.get('/', getUsers);

router.post('/', createUser);

router.delete('/:id', deleteUser);


module.exports = router;