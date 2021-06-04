import pkg from 'sequelize';
import { UsersAssociations, UsersInitialize } from './users.js';
import { GroupInitialize, GroupsAssociations } from './groups.js';
import enVariables from '../config/config.json';

const { Sequelize } = pkg;

export const db = {};

export async function initDB() {
  const env = process.env.NODE_ENV || 'development';
  const config = enVariables[env];
  let sequelize;

  if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable], config);
  } else {
    sequelize = new Sequelize(config.database, config.username, config.password, config);
  }

  [UsersInitialize, GroupInitialize].forEach((modelInitialize) => {
    const model = modelInitialize(sequelize);
    db[model.name] = model;
  });

  GroupsAssociations();
  UsersAssociations();

  Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });
  
  db.sequelize = sequelize;
  db.Sequelize = Sequelize;

  await db.sequelize.sync();
}
