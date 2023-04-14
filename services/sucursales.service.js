const { Op } = require('sequelize')
const { models } = require('../libs/sequelize.js')
const msg = require('../utils/validationsMsg.js')

async function getAllSubsidiaries() {
  return await models.Sucursales.findAll()
}

async function findSubsidiary(id) {
  return await models.Sucursales.findByPk(id)
}

async function createSubsidiary(subsidiary) {
  return await models.Sucursales.create(subsidiary)
}

async function updateSubsidiary(id, changes) {
  const subsidiary = await models.Sucursales.findByPk(id)
  return await subsidiary?.update(changes)
}

async function deleteSubsidiary(id) {
  const subsidiary = await models.Sucursales.findByPk(id, {
    include: [
      'productos',
      'usuarios',
      'ventas',
      'movSucursalesOrigen',
      'movSucursalesDestino',
      'productosDefectuosos'
    ]
  })
  const {
    productos,
    usuarios,
    ventas,
    movSucursalesOrigen,
    movSucursalesDestino,
    productosDefectuosos
  } = subsidiary

  if (
    !!productos.length ||
    !!usuarios.length ||
    !!ventas.length ||
    !!movSucursalesOrigen.length ||
    !!movSucursalesDestino.length ||
    !!productosDefectuosos.length
  )
    return new Error(msg.msgErrorForeignKey)
  return await subsidiary?.destroy()
}

async function subsidiaryByIds(ids) {
  return await models.Sucursales.findAll({
    where: {
      id: { [Op.in]: ids }
    }
  })
}

module.exports = {
  getAllSubsidiaries,
  findSubsidiary,
  createSubsidiary,
  updateSubsidiary,
  deleteSubsidiary,
  subsidiaryByIds
}
