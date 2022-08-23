const { models } = require('../libs/sequelize.js')

async function getAllCustomers() {
  return await models.Clientes.findAll()
}

async function findCustomer(id) {
  return await models.Clientes.findByPk(id, {
    include: ['roles']
  })
}

async function createCustomer(customer) {
  return await models.Clientes.create(customer)
}

async function updateCustomer(id, changes) {
  const customer = await models.Clientes.findByPk(id)
  return await customer?.update(changes)
}

async function deleteCustomer(id) {
  const customer = await models.Clientes.findByPk(id)
  return await customer?.destroy()
}

module.exports = {
  getAllCustomers,
  findCustomer,
  createCustomer,
  updateCustomer,
  deleteCustomer
}
