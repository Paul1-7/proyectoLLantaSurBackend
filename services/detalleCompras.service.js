const { models } = require('../libs/sequelize.js')

async function addPurchaseDetail(data) {
  return await models.DetalleCompras.bulkCreate(data)
}

async function removePurchaseDetail(idCompra) {
  return await models.DetalleCompras.destroy({
    where: {
      idCompra
    }
  })
}

async function updatePurchaseDetail(idSucProd, data) {
  const removed = await removePurchaseDetail(idSucProd)
  const result =
    removed > 0 ? await models.DetalleCompras.bulkCreate(data) : null
  return result
}

module.exports = {
  addPurchaseDetail,
  removePurchaseDetail,
  updatePurchaseDetail
}
