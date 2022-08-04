const { models } = require('../libs/sequelize.js')

async function getAllRols() {
  return await models.Roles.findAll()
}

async function findRol(id) {
  return await models.Roles.findByPk(id)
}

module.exports = {
  getAllRols,
  findRol
}
