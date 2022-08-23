const { models } = require('../libs/sequelize.js')

async function getAllEmployees() {
  return await models.Empleados.findAll({
    include: ['usuarios']
  })
}

async function findEmployee(id) {
  return await models.Empleados.findByPk(id, {
    include: ['roles']
  })
}

async function createEmployee(employee) {
  return await models.Empleados.create(employee)
}

async function updateEmployee(id, changes) {
  const employee = await models.Empleados.findByPk(id)
  return await employee?.update(changes)
}

async function deleteEmployee(id) {
  const employee = await models.Empleados.findByPk(id)
  return await employee?.destroy()
}

module.exports = {
  getAllEmployees,
  findEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee
}
