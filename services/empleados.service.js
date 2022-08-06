const { models } = require('../libs/sequelize.js')

async function getAllEmplooyes() {
  return await models.Empleados.findAll({
    include: ['roles']
  })
}

async function findEmplooye(id) {
  return await models.Empleados.findByPk(id, {
    include: ['roles']
  })
}

async function createEmplooye(user) {
  return await models.Empleados.create(user)
}

async function updateEmplooye(id, changes) {
  const user = await models.Empleados.findByPk(id)
  return await user?.update(changes)
}

async function deleteEmplooye(id) {
  const user = await models.Empleados.findByPk(id)
  return await user?.destroy()
}

module.exports = {
  getAllEmplooyes,
  findEmplooye,
  createEmplooye,
  updateEmplooye,
  deleteEmplooye
}
