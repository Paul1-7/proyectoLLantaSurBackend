const { Op } = require('sequelize')
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

async function removeSubsidiaryProduct(idSucProd) {
  return await models.Sucursales_Productos.destroy({
    where: {
      idSucProd: { [Op.in]: idSucProd }
    }
  })
}

async function updateSubsidiaryProduct(idSucProd, data) {
  const removed = await removeSubsidiaryProduct(idSucProd)
  const result =
    removed > 0 ? await models.Sucursales_Productos.bulkCreate(data) : null
  return result
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
  updateSubsidiaryProduct,
  getProductsBySubsidiariesId
}
