const { Op } = require('sequelize')
const { models } = require('../libs/sequelize.js')

async function getAllSells() {
  return await models.Ventas.findAll({
    include: ['cliente', 'vendedor', 'detalle', 'sucursal']
  })
}

async function getSalesToReport({ dateStart, dateEnd, orderBy, subsidiary }) {
  const options = {
    include: ['cliente', 'vendedor', 'detalle', 'sucursal'],
    where: {
      fecha: {
        [Op.between]: [dateStart, dateEnd]
      }
    },
    order: [orderBy]
  }

  if (subsidiary) options.where = { ...options.where, idSuc: subsidiary }

  return await models.Ventas.findAll(options)
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
