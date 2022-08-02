const { models } = require('../libs/sequelize.js')

async function getAllCustomers() {
  return await models.Clientes.findAll()
}

async function findCustomer(id) {
  return await models.Clientes.findByPk(id)
}

async function createCustomer(user) {
  return await models.Clientes.create(user)
}

async function updateCustomer(id, changes) {
  const user = await models.Clientes.findByPk(id)
  return await user?.update(changes)
}

async function deleteCustomer(id) {
  const user = await models.Clientes.findByPk(id)
  return await user?.destroy()
}

module.exports = {
  getAllCustomers,
  findCustomer,
  createCustomer,
  updateCustomer,
  deleteCustomer
}
