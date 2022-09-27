const { models } = require('../libs/sequelize.js')
const msg = require('../utils/validationsMsg.js')

async function getAllBrands() {
  return await models.Marcas.findAll()
}

async function findBrand(id) {
  return await models.Marcas.findByPk(id)
}

async function createBrand(brand) {
  return await models.Marcas.create(brand)
}

async function updateBrand(id, changes) {
  const brand = await models.Marcas.findByPk(id)
  return await brand?.update(changes)
}

async function deleteBrand(id) {
  const brand = await models.Marcas.findByPk(id, {
    include: 'productos'
  })
  if (brand.productos.length > 0) return new Error(msg.msgErrorForeignKey)
  return await brand?.destroy()
}

module.exports = {
  getAllBrands,
  findBrand,
  createBrand,
  updateBrand,
  deleteBrand
}
