const { models } = require('../libs/sequelize.js')
const msg = require('../utils/validationsMsg.js')

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
  const provider = await models.Proveedores.findByPk(id, {
    include: ['productos', 'compras']
  })

  if (provider.productos.length > 0 || provider.compras.length > 0)
    return new Error(msg.msgErrorForeignKey)
  return await provider?.destroy()
}

module.exports = {
  getAllProviders,
  findProvider,
  createProvider,
  updateProvider,
  deleteProvider
}
