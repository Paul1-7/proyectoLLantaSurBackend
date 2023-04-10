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
        attributes: ['codVenta', 'fecha', 'tipoVenta']
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
  const sell = await modes.ProductosDefectuosos.findByPk(id)
  return await sell?.destroy()
}

module.exports = {
  getAllDefectivesProducts,
  createDefectiveProducts,
  deleteDefectiveProducts,
  getAllDefectivesProductsBySale
}
