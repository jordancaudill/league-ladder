import { Sequelize } from 'sequelize/types';
import { initUsers, usersAssociations, UsersModel } from './users.model';
import { initLeagueAccounts, leagueAccountsAssociations, LeagueAccountsModel } from './league-accounts.model';

export default class Database {
  public Users: typeof UsersModel;
  public LeagueAccounts: typeof LeagueAccountsModel;
  public sequelize: Sequelize;
  constructor(db: Sequelize) {
    console.log('init models')
    // Initialize sequelize models
    this.Users = initUsers(db);
    this.LeagueAccounts = initLeagueAccounts(db);
    this.sequelize = db;
    // Automatically sync model changes to database. Destructive, not for use in production apps.
    this.sequelize.sync({ force: true });

    // Create database associations
    usersAssociations(this);
    leagueAccountsAssociations(this);
  }
}
