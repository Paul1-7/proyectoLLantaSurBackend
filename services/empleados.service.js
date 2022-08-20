const { models } = require('../libs/sequelize.js')

async function getAllEmployes() {
  return await models.Empleados.findAll({
    include: ['roles']
  })
}

async function findEmploye(id) {
  return await models.Empleados.findByPk(id, {
    include: ['roles']
  })
}

async function createEmploye(employee) {
  return await models.Empleados.create(employee)
}

async function updateEmploye(id, changes) {
  const employee = await models.Empleados.findByPk(id)
  return await employee?.update(changes)
}

async function deleteEmploye(id) {
  const employee = await models.Empleados.findByPk(id)
  return await employee?.destroy()
}

module.exports = {
  getAllEmployes,
  findEmploye,
  createEmploye,
  updateEmploye,
  deleteEmploye
}
