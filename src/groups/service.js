import { v4 as uuid } from 'uuid';

export class GroupsService {
  constructor(model) {
    this.model = model;
  }

  getAll = () => {
    return this.model.findAll({});
  };

  getOneById = (id) => {
    return this.model.findOne({
      where: {
        id: id,
      },
    });
  };

  create = (entity) => {
    const id = uuid();
    return this.model.create({
      id: uuid(),
      ...entity,
      permissions: entity.permissions.map(str => str.toUpperCase())
    });
  };

  delete = (id) => {
    return this.model.destroy({
      where: {
        id: id,
      },
    });
  };

  update = (entity, id) => {
    return this.model.update(
      {
        ...entity,
      },
      {
        where: { id: id },
      }
    );
  };

  addTo = async (groupId, userIds, transaction) => {
    const groupInstance = await this.getOneById(groupId);
    return groupInstance.setUsers(userIds, {transaction})
  };
}
