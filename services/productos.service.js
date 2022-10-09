const { Op } = require('sequelize')
const { models } = require('../libs/sequelize.js')
const msg = require('../utils/validationsMsg.js')

async function getAllProducts() {
  return await models.Productos.findAll({
    include: ['categoria', 'marca', 'proveedor', 'sucursales']
  })
}

async function getProductsBySubsidiaryId(subsidiaryId, productsId) {
  return await models.Productos.findAll({
    include: ['categoria', 'marca', 'proveedor', 'sucursales'],
    where: {
      '$sucursales.id$': subsidiaryId,
      id: { [Op.in]: productsId }
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
  const product = await models.Productos.findByPk(id, {
    include: [
      'productosDefectuosos',
      'descuentosPorductos',
      'favoritos',
      'sucursales',
      'detalleCompras',
      'detalleVentas',
      'proveedor'
    ]
  })

  if (
    product.productosDefectuosos.length > 0 ||
    product.descuentosPorductos.length > 0 ||
    product.favoritos.length > 0 ||
    product.sucursales.length > 0 ||
    product.detalleCompras.length > 0 ||
    product.detalleVentas.length > 0 ||
    product.proveedor.length > 0
  )
    return new Error(msg.msgErrorForeignKey)

  await product?.destroy()

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
