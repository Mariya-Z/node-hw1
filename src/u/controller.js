const Users = require('./../db/models').Users;
const uuid = require('uuid').v4;

module.exports = {
  createUser(req, res) {
    return Users
      .create({
        id: uuid(),
        login: req.body.login,
        password: req.body.password,
        age: req.body.age,
        isDeleted: false
      })
      .then(user => res.status(201).send(user))
      .catch(error => res.status(400).send(error));
  },

  getUsers(req, res) {
    return Users
      .findAll({})
      .then(users => res.status(200).send(users))
      .catch(error => res.status(400).send(error));
  },

  deleteUser(req, res) {
    const { id } = req.params;
    console.log('DELETE', req.params.id);

    return Users
      .destroy({
        where: {id: req.params.id}
      })
      .then(users => res.status(200).send('ok'))
      .catch(error => res.status(400).send(error));
  }
};