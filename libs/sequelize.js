const { Sequelize } = require('sequelize')
const config = require('./../config/config.js')
const setupModels = require('./../db/models/index.js')
let URL_DATABASE = config.DB_URL_DEV

const options = {
  dialect: 'postgres',
  logging: false
}

if (config.ISPROD) {
  options.dialectOptions = {
    ssl: {
      rejectUnauthorized: false
    }
  }
  URL_DATABASE = config.DB_URL_PRODUCTION
}

const sequelize = new Sequelize(URL_DATABASE, options)

setupModels(sequelize)

module.exports = sequelize
