const { models } = require('../libs/sequelize.js')

async function getAllSells() {
  return await models.Ventas.findAll({
    include: ['cliente', 'vendedor', 'detalle', 'pedido']
  })
}

async function findSell(id) {
  return await models.Ventas.findByPk(id, {
    include: ['cliente', 'vendedor', 'detalle', 'pedido']
  })
}

async function createSell(sell) {
  return await models.Ventas.create(sell)
}

async function updateSell(id, changes) {
  const sell = await models.Ventas.findByPk(id)
  return await sell?.update(changes)
}

async function deleteSell(id) {
  const sell = await models.Ventas.findByPk(id)
  return await sell?.destroy()
}

module.exports = {
  getAllSells,
  findSell,
  createSell,
  updateSell,
  deleteSell
}
