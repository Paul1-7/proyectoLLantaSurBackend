const { models } = require('../libs/sequelize.js')

async function getAllSubsidiariesMovements() {
  return await models.MovimientosSucursales.findAll({
    include: [
      {
        model: models.Usuarios,
        as: 'usuario',
        attributes: ['nombre', 'apellido']
      },
      {
        model: models.Sucursales,
        as: 'sucursalOrigen',
        attributes: ['nombre']
      },
      {
        model: models.Sucursales,
        as: 'sucursalDestino',
        attributes: ['nombre']
      },
      {
        model: models.Productos,
        as: 'producto',
        attributes: ['nombre']
      }
    ]
  })
}

async function createSubsidiaryMovement(data) {
  return await models.MovimientosSucursales.create(data)
}

async function deleteSubsidiaryMovement(id) {
  const data = await models.MovimientosSucursales.findByPk(id)
  return await data?.destroy()
}

module.exports = {
  getAllSubsidiariesMovements,
  createSubsidiaryMovement,
  deleteSubsidiaryMovement
}
