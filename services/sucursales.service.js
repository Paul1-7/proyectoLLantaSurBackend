const { models } = require('../libs/sequelize.js')
const msg = require('../utils/validationsMsg.js')

async function getAllSubsidiaries() {
  return await models.Sucursales.findAll()
}

async function findSubsidiary(id) {
  return await models.Sucursales.findByPk(id)
}

async function createSubsidiary(subsidiary) {
  return await models.Sucursales.create(subsidiary)
}

async function updateSubsidiary(id, changes) {
  const subsidiary = await models.Sucursales.findByPk(id)
  return await subsidiary?.update(changes)
}

async function deleteSubsidiary(id) {
  const subsidiary = await models.Sucursales.findByPk(id, {
    include: ['productos', 'usuarios']
  })
  if (subsidiary.productos.length > 0 || subsidiary.usuarios.length > 0)
    return new Error(msg.msgErrorForeignKey)
  return await subsidiary?.destroy()
}

module.exports = {
  getAllSubsidiaries,
  findSubsidiary,
  createSubsidiary,
  updateSubsidiary,
  deleteSubsidiary
}
