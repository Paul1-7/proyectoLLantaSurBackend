const { models } = require('../libs/sequelize.js')

async function addPurchaseDetail(data) {
  return await models.Detalle_Compras.bulkCreate(data)
}

async function removePurchaseDetail(idSucProd) {
  return await models.Detalle_Compras.destroy({
    where: {
      idSucProd: { [Op.in]: idSucProd }
    }
  })
}

async function updatePurchaseDetail(idSucProd, data) {
  const removed = await removePurchaseDetail(idSucProd)
  const result =
    removed > 0 ? await models.Detalle_Compras.bulkCreate(data) : null
  return result
}

module.exports = {
  addPurchaseDetail,
  removePurchaseDetail,
  updatePurchaseDetail
}
