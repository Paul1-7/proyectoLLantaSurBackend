const { models } = require('../libs/sequelize.js')

async function getAllDefectivesProducts() {
  return await models.ProductosDefectuosos.findAll({
    include: [
      {
        model: models.Productos,
        as: 'producto',
        attributes: ['nombre', 'imagen']
      },
      {
        model: models.Sucursales,
        as: 'sucursal',
        attributes: ['nombre']
      },
      {
        model: models.Ventas,
        as: 'venta',
        attributes: ['codVenta', 'fecha']
      }
    ]
  })
}
async function getAllDefectivesProductsBySale(idVenta) {
  return await models.ProductosDefectuosos.findAll({
    include: [
      {
        model: models.Productos,
        as: 'producto',
        attributes: ['nombre', 'imagen']
      },
      {
        model: models.Sucursales,
        as: 'sucursal',
        attributes: ['nombre']
      },
      {
        model: models.Ventas,
        as: 'venta',
        attributes: ['codVenta', 'fecha']
      }
    ],
    where: {
      idVenta
    }
  })
}

async function createDefectiveProducts(data) {
  return await models.ProductosDefectuosos.bulkCreate(data)
}

async function deleteDefectiveProducts(id) {
  const sell = await models.ProductosDefectuosos.findByPk(id)
  return await sell?.destroy()
}

async function findDefectiveProducts(id) {
  return await models.ProductosDefectuosos.findByPk(id)
}

module.exports = {
  getAllDefectivesProducts,
  createDefectiveProducts,
  deleteDefectiveProducts,
  getAllDefectivesProductsBySale,
  findDefectiveProducts
}
