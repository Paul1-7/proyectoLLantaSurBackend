const { Op } = require('sequelize')
const { models } = require('../libs/sequelize.js')
const { format } = require('date-fns')

async function getAllPurchases() {
  return await models.Compras.findAll({
    include: ['usuario', 'detalle', 'proveedor']
  })
}

async function countPurchaseCode() {
  const today = format(new Date(), 'yyyyMMdd')
  const pattern = `C-${today}%`
  return await models.Compras.count({
    where: {
      codReferencia: {
        [Op.like]: pattern
      }
    }
  })
}

async function getPurchaseToReport({ dateStart, dateEnd, orderBy }) {
  const options = {
    include: ['proveedor', 'usuario', 'detalle'],
    where: {
      fecha: {
        [Op.between]: [dateStart, dateEnd]
      }
    },
    order: [orderBy]
  }

  return await models.Compras.findAll(options)
}

async function findPurchase(id) {
  return await models.Compras.findByPk(id, {
    include: [
      'usuario',
      'detalle',
      'proveedor',
      {
        association: 'detalle',
        include: [{ association: 'producto', include: 'sucursales' }]
      }
    ]
  })
}

async function createPurchase(sell) {
  return await (await models.Compras.create(sell)).toJSON()
}

async function updatePurchase(id, changes) {
  const sell = await models.Compras.findByPk(id)
  return await sell?.update(changes)
}

module.exports = {
  getAllPurchases,
  findPurchase,
  createPurchase,
  updatePurchase,
  getPurchaseToReport,
  countPurchaseCode
}
