import pkg from 'sequelize';
import { Groups } from './groups.js';
const { Model, DataTypes } = pkg;

export class Users extends Model {}

export function UsersInitialize(sequelize) {
  Users.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    login: DataTypes.STRING,
    password: DataTypes.STRING,
    age: DataTypes.INTEGER,
    isDeleted: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
}

export function UsersAssociations() {
  Users.belongsToMany(Groups, {
    through: 'UserGroup'
  });
}
