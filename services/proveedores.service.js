const { models } = require('../libs/sequelize.js')

async function getAllProviders() {
  return await models.Proveedores.findAll()
}

async function findProvider(id) {
  return await models.Proveedores.findByPk(id)
}

async function createProvider(provider) {
  return await models.Proveedores.create(provider)
}

async function updateProvider(id, changes) {
  const provider = await models.Proveedores.findByPk(id)
  return await provider?.update(changes)
}

async function deleteProvider(id) {
  const provider = await models.Proveedores.findByPk(id)
  return await provider?.destroy()
}

module.exports = {
  getAllProviders,
  findProvider,
  createProvider,
  updateProvider,
  deleteProvider
}
