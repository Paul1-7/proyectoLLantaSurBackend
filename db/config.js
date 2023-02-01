require('dotenv').config()

module.exports = {
  development: {
    use_env_variable: 'DB_URL_DEV',
    dialect: 'postgres',
    logging: false
  },
  production: {
    dialect: 'postgres',
    url: 'DB_URL_PRODUCTION',
    logging: false,
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false
      }
    }
  }
}
