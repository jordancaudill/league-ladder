/* istanbul ignore file */
import { Sequelize } from 'sequelize';
import logger from './logger';

const init = async (): Promise<Sequelize | null> => {
  const host = process.env.DB_HOST || 'localhost';
  const userName = process.env.DB_USER || 'leagueladderdba';
  const password = process.env.DB_PASS || 'password';
  const port = parseInt(process.env.DB_PORT || '1433');
  const databaseName = process.env.DB_NAME || 'league-ladder';
  const dialect = process.env.DB_DIALECT;

  let db: Sequelize | null = null;

  try {
    if (dialect === 'sqlite') {
      db = new Sequelize('sqlite::memory:', { logging: false });
    } else {
      const config = {
        host,
        port,
        dialect
      };
      console.log(config)
      db = new Sequelize(databaseName, userName, password, config as any);
    }
    await db
      .authenticate()
      .then(() => {
        logger.info('Successfully connected to the database.');
      })
      .catch((err: any) => logger.error(err));
  } catch (err) {
    logger.error('Could not connect to the database. Sequelize error:', err);
  }
  return db;
};
const databaseConnection = async (): Promise<Sequelize | null> => {
  return await init();
};

export default databaseConnection;
