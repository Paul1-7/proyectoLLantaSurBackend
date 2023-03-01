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

async function findDefectiveProduct(id) {
  return await models.Productos_Defectuosos.findByPk(id, {
    include: [
      {
        model: models.Productos,
        as: 'producto',
        attributes: ['nombre', 'imagen']
      }
    ]
  })
}

async function createDefectiveProducts(data) {
  return await models.Productos_Defectuosos.bulkCreate(data)
}

async function updateDefectiveProducts(id, changes) {
  const sell = await models.Productos_Defectuosos.findByPk(id)
  return await sell?.update(changes)
}

async function deleteDefectiveProducts(id) {
  const sell = await models.Productos_Defectuosos.findByPk(id)
  return await sell?.destroy()
}

module.exports = {
  getAllDefectivesProducts,
  findDefectiveProduct,
  createDefectiveProducts,
  updateDefectiveProducts,
  deleteDefectiveProducts
}
