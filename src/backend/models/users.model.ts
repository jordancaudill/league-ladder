import Sequelize from 'sequelize';
import { Sequelize as SequelizeType } from 'sequelize/types';
import { User } from '../../shared/types/User';
import Database from './index';

// Merge the Typescript interface with the class so our typescript definitions are applied to the model
export interface UsersModel extends User {}
export class UsersModel extends Sequelize.Model {}

/** The sequelize schema for this model */
export const UsersSchema: Sequelize.ModelAttributes = {
  id: {
    type: Sequelize.STRING,
    primaryKey: true,
    allowNull: false,
  },
  createdAt: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  updatedAt: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  birthdate: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  discordHandle: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  discordId: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  admin: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  emailVerified: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  subStatus: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },

};

/** Initializes this model for use */
export const initUsers = (db: SequelizeType) => {
  UsersModel.init(UsersSchema, {
    sequelize: db,
    modelName: 'Users'
  });
  return UsersModel;
};

/** Creates all the table associations for this model */
export const usersAssociations = (db: Database) => {
  // db.User.hasMany(db.Team, {
  //   foreignKey: 'userID',
  //   as: 'creator'
  // });
};
