const { models } = require('../libs/sequelize.js')

async function getAllProducts() {
  return await models.Productos.findAll()
}

async function findProduct(id) {
  return await models.Productos.findByPk(id)
}

async function createProduct(product) {
  return await models.Productos.create(product)
}

async function updateProduct(id, changes) {
  const product = await models.Productos.findByPk(id)
  return await product?.update(changes)
}

async function deleteProduct(id) {
  const product = await models.Productos.findByPk(id)
  return await product?.destroy()
}

module.exports = {
  getAllProducts,
  findProduct,
  createProduct,
  updateProduct,
  deleteProduct
}
