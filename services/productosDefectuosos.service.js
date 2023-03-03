const { models } = require('../libs/sequelize.js')

async function getAllDefectivesProducts() {
  return await models.Productos_Defectuosos.findAll({
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
  return await models.Productos_Defectuosos.findAll({
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
    ],
    where: {
      idVenta
    }
  })
}

async function createDefectiveProducts(data) {
  return await models.Productos_Defectuosos.bulkCreate(data)
}

async function deleteDefectiveProducts(id) {
  const sell = await models.Productos_Defectuosos.findByPk(id)
  return await sell?.destroy()
}

module.exports = {
  getAllDefectivesProducts,
  createDefectiveProducts,
  deleteDefectiveProducts,
  getAllDefectivesProductsBySale
}
