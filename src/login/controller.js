import jwt from 'jsonwebtoken';
import { Users } from '../db/models/users.js';
import { UsersService } from '../users/service.js';
import { controllerErrorLogger } from '../utils/controller-error-logger.js';

const usersServiceInstance = new UsersService(Users);

export const login = (req, res, next) => {
  // TODO - add validation
  const { login, password } = req.body;
  return usersServiceInstance.getOneByCredentials(login, password)
    .then(user => {
      if (user) {
        const payload = { sub: user.id };
        const token = jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: 3000 });
        res.send({success: true, message: token})
      } else {
        res.status(401).send({
          success: false,
          message: 'Bad username/password combination.'
        });
      }
    })
    .catch(error => {
      controllerErrorLogger({
        controllerName: 'loginController',
        methodName: 'login',
        args: req.query,
        error: error,
      });
      next(error);
    });
};
