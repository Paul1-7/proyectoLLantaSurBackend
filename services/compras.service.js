const { Op } = require('sequelize')
const { models } = require('../libs/sequelize.js')

async function getAllPurchases() {
  return await models.Compras.findAll({
    include: ['usuario', 'detalle', 'proveedor']
  })
}

async function getPurchaseToReport({
  dateStart,
  dateEnd,
  orderBy,
  subsidiary
}) {
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
  getPurchaseToReport
}
