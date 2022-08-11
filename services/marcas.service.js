const { models } = require('../libs/sequelize.js')

async function getAllBrands() {
  return await models.Marcas.findAll()
}

async function findBrand(id) {
  return await models.Marcas.findByPk(id)
}

async function createBrand(user) {
  return await models.Marcas.create(user)
}

async function updateBrand(id, changes) {
  const user = await models.Marcas.findByPk(id)
  return await user?.update(changes)
}

async function deleteBrand(id) {
  const user = await models.Marcas.findByPk(id)
  return await user?.destroy()
}

module.exports = {
  getAllBrands,
  findBrand,
  createBrand,
  updateBrand,
  deleteBrand
}
