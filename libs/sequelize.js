const { Sequelize } = require('sequelize')
const config = require('./../config/config.js')
const setupModels = require('./../db/models/index.js')
let { DATABASE_URL } = config

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
}

const sequelize = new Sequelize(DATABASE_URL, options)

setupModels(sequelize)

module.exports = sequelize
