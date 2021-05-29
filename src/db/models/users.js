import pkg from 'sequelize';
const { Model, DataTypes } = pkg;

export class Users extends Model {}

export function UsersInitialize(sequelize) {
  Users.init({
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