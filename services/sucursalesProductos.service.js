const { Op } = require('sequelize')
const { models } = require('../libs/sequelize.js')

/**
 * It takes an array of subsidiary ids and an array of stock values and creates a new row in the
 * SucursalesProductos table for each subsidiary id with the corresponding stock value
 * @param idProd - The product id
 * @param subsidiaries - [1, 2, 3]
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
async function addSubsidiaryProduct(idProd, subsidiaries) {
  const data = subsidiaries.map((subsidiary) => ({ ...subsidiary, idProd }))

  return await models.SucursalesProductos.bulkCreate(data)
}

async function removeSubsidiaryProduct(id) {
  return await models.SucursalesProductos.destroy({
    where: {
      idProd: id
    }
  })
}

async function updataSeveralSubsidiaryProduct(ids, newData) {
  const removed = await models.SucursalesProductos.destroy({
    where: {
      id: { [Op.in]: ids }
    }
  })

  return removed > 0 ? models.SucursalesProductos.bulkCreate(newData) : null
}

async function updateSubsidiaryProduct(id, data) {
  const removed = await removeSubsidiaryProduct(id)
  const result = removed > 0 ? await addSubsidiaryProduct(id, data) : null
  return result
}

async function getProductsBySubsidiariesId(id) {
  return await models.SucursalesProductos.findAll({
    where: {
      idSuc: id
    }
  })
}
async function getProductsSubsidiariesByIdProd(ids) {
  return await models.SucursalesProductos.findAll({
    include: ['producto'],
    where: {
      idProd: { [Op.in]: ids }
    }
  }).then((values) => values.map((value) => value.toJSON()))
}

module.exports = {
  addSubsidiaryProduct,
  updateSubsidiaryProduct,
  getProductsBySubsidiariesId,
  removeSubsidiaryProduct,
  updataSeveralSubsidiaryProduct,
  getProductsSubsidiariesByIdProd
}
