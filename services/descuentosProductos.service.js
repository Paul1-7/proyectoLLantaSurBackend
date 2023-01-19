const { models } = require('../libs/sequelize.js')

async function addDiscountsProduct(data) {
  return await models.Descuentos_Productos.bulkCreate(data)
}

async function removeDiscountsProducts(id) {
  return await models.Descuentos_Productos.destroy({
    where: {
      idDesc: id
    }
  })
}

async function updateDiscountsProducts(id, newData) {
  removeDiscountsProducts(id)
  return await models.Descuentos_Productos.bulkCreate(newData)
}

module.exports = {
  addDiscountsProduct,
  updateDiscountsProducts,
  removeDiscountsProducts
}
