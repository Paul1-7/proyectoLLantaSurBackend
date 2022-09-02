const { Op } = require('sequelize')
const { models } = require('../libs/sequelize.js')

async function getAllProducts() {
  return await models.Productos.findAll({
    include: ['categoria', 'marca', 'proveedor', 'sucursales']
  })
}

async function getProductsBySubsidiaryId(subsidiaryId, productsId) {
  return await models.Productos.findAll({
    include: ['categoria', 'marca', 'proveedor', 'sucursales'],
    where: {
      '$sucursales.id_suc$': subsidiaryId,
      idProd: { [Op.in]: productsId }
    }
  })
}

async function findProduct(id) {
  return await models.Productos.findByPk(id, {
    include: ['categoria', 'marca', 'proveedor', 'sucursales']
  })
}

async function findProductByName(name) {
  return await models.Productos.findOne({
    where: {
      nombreProd: name
    }
  })
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

  await models.Productos.destroy({
    where: {
      idProd: id
    }
  })

  return product
}

module.exports = {
  getAllProducts,
  findProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  findProductByName,
  getProductsBySubsidiaryId
}
