const { models } = require('../libs/sequelize.js')

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
  const subsidiary = await models.Sucursales.findByPk(id)
  return await subsidiary?.destroy()
}

module.exports = {
  getAllSubsidiaries,
  findSubsidiary,
  createSubsidiary,
  updateSubsidiary,
  deleteSubsidiary
}
