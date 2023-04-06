const { Op } = require('sequelize')
const { models } = require('../libs/sequelize.js')
const msg = require('../utils/validationsMsg.js')
const { format } = require('date-fns')

async function getAllProducts(idCliente) {
  let options = {
    include: [
      'categoria',
      'marca',
      'proveedor',
      'sucursales',
      {
        model: models.Descuentos,
        as: 'descuentos',
        attributes: ['id', 'fechaFin'],
        through: {
          attributes: ['idProd']
        }
      }
    ]
  }

  if (idCliente) {
    options = {
      include: [
        ...options.include,
        {
          model: models.Favoritos,
          as: 'favoritos'
        }
      ]
    }
  }
  return await models.Productos.findAll(options)
}

async function countProductCode() {
  const today = format(new Date(), 'yyyyMMdd')
  const pattern = `P-${today}%`
  return await models.Productos.count({
    where: {
      codReferencia: {
        [Op.like]: pattern
      }
    }
  })
}

async function getProductsBySubsidiaryId(subsidiaryId, productsId) {
  const products = await models.Productos.findAll({
    include: [
      'categoria',
      'marca',
      'proveedor',
      'sucursales',
      'descuentosProductos'
    ],
    where: {
      '$sucursales.id$': subsidiaryId,
      id: { [Op.in]: productsId }
    }
  })

  return products.map((product) => product.toJSON())
}

async function getProductsById(productsId) {
  const products = await models.Productos.findAll({
    include: ['sucursales', 'descuentosProductos', 'proveedor', 'sucursales'],
    where: {
      id: { [Op.in]: productsId }
    }
  })

  return products.map((product) => product.toJSON())
}

async function getAllProductsToReport(subsidiariesId, criteria) {
  const where =
    subsidiariesId.length > 1
      ? {
          '$sucursales.id$': {
            [Op.in]: subsidiariesId
          },
          '$sucursalesProductos.id_suc$': {
            [Op.in]: subsidiariesId
          }
        }
      : {
          '$sucursales.id$': subsidiariesId.at(0),
          '$sucursalesProductos.id_suc$': subsidiariesId.at(0)
        }

  const products = await models.Productos.findAll({
    include: [
      {
        model: models.Categorias,
        as: 'categoria',
        attributes: { exclude: ['descripcion', 'estado', 'id'] }
      },
      {
        model: models.Marcas,
        as: 'marca',
        attributes: { exclude: ['estado', 'id'] }
      },
      {
        model: models.Proveedores,
        as: 'proveedor',
        attributes: ['nombre']
      },
      {
        model: models.Sucursales_Productos,
        as: 'sucursalesProductos',
        attributes: ['stock', 'idSuc']
      },
      {
        model: models.Sucursales,
        as: 'sucursales',
        attributes: ['nombre'],
        through: {
          attributes: []
        }
      }
    ],
    where,
    order: [criteria],
    attributes: {
      exclude: ['estado', 'imagen', 'idImg', 'idProv', 'idMarca', 'idCat']
    }
  })

  return products.map((product) => product.toJSON())
}

async function findProduct(id) {
  return await models.Productos.findByPk(id, {
    include: [
      'categoria',
      'marca',
      'proveedor',
      'sucursales',
      'favoritos',
      {
        association: 'descuentosProductos',
        include: [{ association: 'descuento' }]
      }
    ]
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

async function updateMultipleProducts(products, updateOnDuplicate) {
  return await models.Productos.bulkCreate(products, { updateOnDuplicate })
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
  getProductsById,
  findProductByName,
  getProductsBySubsidiaryId,
  getAllProductsToReport,
  updateMultipleProducts,
  countProductCode
}
