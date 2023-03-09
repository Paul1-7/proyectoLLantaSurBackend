const { Op } = require('sequelize')
const { models } = require('../libs/sequelize.js')

async function getAllSells() {
  return await models.Ventas.findAll({
    include: ['cliente', 'vendedor', 'detalle', 'pedido']
  })
}

async function getSalesToReport({ start, final }) {
  return await models.Ventas.findAll({
    include: ['cliente', 'vendedor', 'detalle', 'pedido'],
    where: {
      fecha: {
        [Op.between]: [start, final]
      }
    }
  })
}

async function findSell(id) {
  return await models.Ventas.findByPk(id, {
    include: [
      'cliente',
      'vendedor',
      'detalle',
      'pedido',
      {
        association: 'detalle',
        include: [{ association: 'producto', include: 'sucursales' }]
      }
    ]
  })
}

async function createSell(sell) {
  return await (await models.Ventas.create(sell)).toJSON()
}

async function updateSell(id, changes) {
  const sell = await models.Ventas.findByPk(id)
  return await sell?.update(changes)
}

module.exports = {
  getAllSells,
  findSell,
  createSell,
  updateSell,
  getSalesToReport
}
