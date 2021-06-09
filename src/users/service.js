import { Sequelize } from 'sequelize';
import { v4 as uuid } from 'uuid';

export class UsersService {

  constructor(model) {
    this.model = model;
  }

  getAll = () => {
    // TODO - add param isDeleted
    return this.model.findAll({
      attributes: ['login', 'age', 'id'],
      where: {
        isDeleted: false
      }
    });
  }

  getOneById = (id) => {
    return this.model.findOne({
      attributes: ['login', 'age', 'id'],
      where: {
        id: id
      }
    });
  }

  create = (entity) => {
    return this.model.create({
      id: uuid(),
      isDeleted: false,
      ...entity,
    });
  }

  delete = (id) => {
    return  this.model.update(
      {
        isDeleted: true,
      }, {
        where: {
          id: id,
          isDeleted: false,
        }
      });

  }

  update = (entity, id) => {
    return this.model.update(
      { 
        ...entity,
      }, {
        where: {id: id}
      }
    );
  }

  search = (prefix, limit) => {
    return this.model.findAndCountAll({
      attributes: ['login', 'age', 'id'],
      where: {
        login: {
          [Sequelize.Op.like]: `${prefix}%`,
        }
      },
      limit: limit,
    })
  }
}
