import pkg from 'sequelize';
import { Users } from './users.js';
const { Model, DataTypes } = pkg;

// type Permission = 'READ' | 'WRITE' | 'DELETE' | 'SHARE' | 'UPLOAD_FILES';

export class Groups extends Model {}

export function GroupInitialize(sequelize) {
  Groups.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    permissions: DataTypes.ARRAY(DataTypes.STRING),
  }, {
    sequelize,
    modelName: 'Groups',
  });
  return Groups;
}

export function GroupsAssociations() {
  Groups.belongsToMany(Users, { 
    through: 'UserGroup'
  });
}
