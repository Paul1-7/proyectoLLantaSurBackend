const { models } = require('../libs/sequelize.js')

async function getAllRols() {
  return await models.Roles.findAll()
}

async function findRol(id) {
  return await models.Roles.findByPk(id)
}

async function findRolByName(name) {
  return await models.Roles.findOne({ where: { nombre_rol: name } })
}

module.exports = {
  getAllRols,
  findRol,
  findRolByName
}
