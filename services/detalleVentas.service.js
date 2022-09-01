const { models } = require('../libs/sequelize.js')

async function addSellDetail(data) {
  return await models.Detalle_Ventas.bulkCreate(data)
}

async function removeSellDetail(idSucProd) {
  return await models.Detalle_Ventas.destroy({
    where: {
      idSucProd: { [Op.in]: idSucProd }
    }
  })
}

async function updateSellDetail(idSucProd, data) {
  const removed = await removeSellDetail(idSucProd)
  const result =
    removed > 0 ? await models.Detalle_Ventas.bulkCreate(data) : null
  return result
}

module.exports = {
  addSellDetail,
  removeSellDetail,
  updateSellDetail
}
