import Sequelize from 'sequelize';
import { Sequelize as SequelizeType } from 'sequelize/types';
import { LeagueAccount } from '../../shared/types/LeagueAccount';
import Database from './index';

// Merge the Typescript interface with the class so our typescript definitions are applied to the model
export interface LeagueAccountsModel extends LeagueAccount {}
export class LeagueAccountsModel extends Sequelize.Model {}

/** The sequelize schema for this model */
export const LeagueAccountsSchema: Sequelize.ModelAttributes = {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
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
  userId: {
    type: Sequelize.STRING,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  summonerId: {
    type: Sequelize.STRING,
    allowNull: false
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false
  },


};

/** Initializes this model for use */
export const initLeagueAccounts = (db: SequelizeType) => {
  LeagueAccountsModel.init(LeagueAccountsSchema, {
    sequelize: db,
    modelName: 'LeagueAccounts'
  });
  return LeagueAccountsModel;
};

/** Creates all the table associations for this model */
export const leagueAccountsAssociations = (db: Database) => {
  // db.User.hasMany(db.Team, {
  //   foreignKey: 'userID',
  //   as: 'creator'
  // });
};
