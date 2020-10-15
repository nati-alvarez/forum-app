require("dotenv").config();
const path = require("path");

module.exports = {
  development: {
    client: 'pg',
    connection: process.env.DB_CONNECTION,
    migrations: {
      directory: path.join(__dirname, "/models/migrations")
    },
    seeds: {
      directory: path.join(__dirname, "/models/seeds")
    }
  },

  production: {
    client: 'pg',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
