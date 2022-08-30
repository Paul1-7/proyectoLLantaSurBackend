const { models } = require('../libs/sequelize.js')

/**
 * It takes an array of subsidiary ids and an array of stock values and creates a new row in the
 * Sucursales_Productos table for each subsidiary id with the corresponding stock value
 * @param idProd - The product id
 * @param subsidiary - [1, 2, 3]
 * @param stockProd - [1, 2, 3]
 * @returns An array of objects with the following structure:
 * [
 *   {
 *     idProd: 1,
 *     idSuc: 1,
 *     stockProd: 10
 *   },
 *   {
 *     idProd: 1,
 *     idSuc: 2,
 *     stockProd: 20
 *   }
 * ]
 */
async function addSubsidiaryProduct(idProd, subsidiary, stockProd) {
  const data = []

  for (let i = 0; i < subsidiary.length; i++) {
    data.push({
      idProd,
      idSuc: subsidiary[i],
      stockProd: stockProd[i]
    })
  }

  return await models.Sucursales_Productos.bulkCreate(data)
}

async function removeSubsidiaryProduct(idProd) {
  return await models.Sucursales_Productos.destroy({
    where: { idProd }
  })
  models.Sucursales_Productos.afterBulkUpdate
}

async function updateSubsidiaryProduct(idProd, subsidiary, stockProd) {
  await removeSubsidiaryProduct(idProd)
  return await addSubsidiaryProduct(idProd, subsidiary, stockProd)
}

async function getProductsBySubsidiariesId(id) {
  return await models.Sucursales_Productos.findAll({
    where: {
      idSuc: id
    }
  })
}

module.exports = {
  addSubsidiaryProduct,
  removeSubsidiaryProduct,
  updateSubsidiaryProduct,
  getProductsBySubsidiariesId
}
