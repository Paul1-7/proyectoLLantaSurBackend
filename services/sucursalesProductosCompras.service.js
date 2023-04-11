const { models } = require('../libs/sequelize.js')

async function addSubProdPurchases(data) {
  return await models.SucursalesProductosCompras.bulkCreate(data)
}

async function getSubProdPurchasesByIds(idCompra) {
  return await models.SucursalesProductosCompras.findAll({
    where: {
      idCompra
    }
  }).then((values) => values.map((value) => value.toJSON()))
}

async function removeSubProdPurchaseByIdPurchase(idCompra) {
  return await models.SucursalesProductosCompras.destroy({
    where: {
      idCompra
    }
  })
}

module.exports = {
  addSubProdPurchases,
  removeSubProdPurchaseByIdPurchase,
  getSubProdPurchasesByIds
}
