require('dotenv/config.js')

const config = {
  ENV: process.env.NODE_ENV || 'dev',
  ISPROD: process.env.NODE_ENV === 'production',
  PORT: process.env.PORT || 3000,
  DBUSER: process.env.DB_USER,
  DBPASSWORD: process.env.DB_PASSWORD,
  DBHOST: process.env.DB_HOST,
  DBNAME: process.env.DB_NAME,
  DBPORT: process.env.DB_PORT,
  DBURL: process.env.DATABASE_URL
}

module.exports = config
