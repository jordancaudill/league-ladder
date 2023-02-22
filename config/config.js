require('dotenv').config()
const config = {
  'username': process.env.DB_USER,
  'password': process.env.DB_PASS,
  'database': process.env.DB_NAME,
  'host': process.env.DB_HOST,
  'port': process.env.DB_PORT,
  'dialect': process.env.DB_DIALECT,
  logging: console.log,
  dialectOptions: {
    options: {
      encrypt: true,
      requestTimeout: 600000
    }
  },
  'seederStorage': 'sequelize'
};
module.exports = config;