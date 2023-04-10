const { models } = require('../libs/sequelize.js')

async function addDiscountsProduct(data) {
  return await models.DescuentosProductos.bulkCreate(data)
}

async function removeDiscountsProducts(id) {
  return await models.DescuentosProductos.destroy({
    where: {
      idDesc: id
    }
  })
}

async function updateDiscountsProducts(id, newData) {
  removeDiscountsProducts(id)
  return await models.DescuentosProductos.bulkCreate(newData)
}

module.exports = {
  addDiscountsProduct,
  updateDiscountsProducts,
  removeDiscountsProducts
}
